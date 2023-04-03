import axios from 'axios';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import { createElement } from 'react';
import jwt from 'jsonwebtoken';
import json5 from 'json5';
import queryString from 'query-string';
import { renderToString } from 'react-dom/server.js';
import ssrPrepass from 'react-ssr-prepass';
import { StaticRouter } from 'react-router-dom/server.js';
import { Helmet } from 'react-helmet';
import {
  AccessCheck,
  AccessClaimCheck,
  AccessGrantAll,
  User,
} from 'kodim-cms/esm/content/access-check.js';
import { KodimCms } from 'kodim-cms';
import { ErrorRequestHandler } from 'express';
import type { Store } from '../../common/AppContext';
import { GroupModel, UserModel } from '../db';
import type { Invitation } from '../../common/pages/InvitePage/InvitationMessage';
import { authController } from './auth';
import { ServerContextProvider } from '../../common/AppContext';
import App from '../../common/App';

declare global {
  namespace Express {
    interface Request {
      store: Store,
    }
  }
}

const stats = json5.parse(fs.readFileSync('./stats.json5', 'utf-8'));

export const webappController = (
  config: any,
  cms: KodimCms,
) => {
  const router = authController(config, 'all');

  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.clearCookie('token');
      res.redirect('/');
    } else {
      next(err);
    }
  };

  router.use(errorHandler);

  router.use((req, res, next) => {
    req.store = {};
    next();
  });

  router.get('/odhlasit', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
  });

  router.get('/prihlasit', (req, res, next) => {
    const returnUrl = typeof req.query.returnUrl === 'string' ? req.query.returnUrl : '/';

    if (req.account !== undefined) {
      res.redirect(returnUrl);
      return;
    }
    next();
  });

  router.get('/prihlasit/github', async (req, res) => {
    const parseReturnUrl = (state: any): string => {
      if (typeof state !== 'string') {
        return '/';
      }

      try {
        const parsed = JSON.parse(state);
        if (typeof parsed.returnUrl === 'string') {
          return parsed.returnUrl;
        }
        return '/';
      } catch (e) {
        return '/';
      }
    };

    const returnUrl = parseReturnUrl(req.query.state);

    const { data } = await axios.get(
      'https://github.com/login/oauth/access_token',
      {
        params: {
          client_id: config.githubApp.clientId,
          client_secret: config.githubApp.clientSecret,
          code: req.query.code,
        },
      },
    );

    const parsed = queryString.parse(data);
    const { data: githubUser } = await axios.get('https://api.github.com/user', {
      headers: {
        Accept: 'application/json',
        Authorization: `token ${parsed.access_token}`,
      },
    });

    let dbUser = await UserModel.findOne({ login: githubUser.login });

    if (dbUser === null) {
      dbUser = new UserModel({
        login: githubUser.login,
        name: githubUser.name ?? githubUser.login,
        avatarUrl: githubUser.avatar_url,
        appToken: jwt.sign({ usr: githubUser.login, scp: 'app' }, config.sessionSecret),
        email: githubUser.email ?? undefined,
        groups: [],
      });
      await dbUser.save();
    }

    const user = dbUser.toObject();

    if (user.appToken === undefined) {
      dbUser.set('appToken', jwt.sign({ usr: githubUser.login, scp: 'app' }, config.sessionSecret));
      await dbUser.save();
    }

    const token = jwt.sign({ usr: user.login, scp: 'all' }, config.sessionSecret);
    res.cookie('token', token);
    res.redirect(returnUrl);
  });

  router.post('/prihlasit', async (req, res, next) => {
    const returnUrl = typeof req.query.returnUrl === 'string' ? req.query.returnUrl : '/';
    const { loginOrEmail, password } = req.body;

    if (typeof password !== 'string' || typeof loginOrEmail !== 'string') {
      res.sendStatus(400);
      return;
    }

    const dbUser = await UserModel.findOne(
      loginOrEmail.includes('@') ? { email: loginOrEmail } : { login: loginOrEmail },
    );

    if (dbUser === null) {
      req.store.badCredentials = true;
      next();
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, dbUser.password!);
    if (!isPasswordCorrect) {
      req.store.badCredentials = true;
      next();
      return;
    }

    const token = jwt.sign({ usr: dbUser.login, scp: 'all' }, config.sessionSecret);
    res.cookie('token', token);
    res.redirect(returnUrl);
  });

  router.get('/pozvanky/skupina/:inviteToken', async (req, res, next) => {
    const { inviteToken } = req.params;

    const invitation: Invitation = {
      status: 'invite',
      groupTitle: '',
    };

    req.store.invitation = invitation;

    const login: string | undefined = req.account?.user.login;

    if (login === undefined) {
      invitation.status = 'no-login';
      next();
      return;
    }

    const dbUser = await UserModel.findOne({ login });
    if (dbUser === null) {
      res.sendStatus(500);
      return;
    }

    const dbGroup = await GroupModel.findOne({ inviteToken });
    if (dbGroup === null) {
      invitation.status = 'no-group';
      next();
      return;
    }

    invitation.groupTitle = dbGroup.title;

    if (dbUser.groups.includes(dbGroup.id)) {
      invitation.status = 'already-joined';
    }

    next();
  });

  router.post('/pozvanky/skupina/:inviteToken/:action', async (req, res, next) => {
    const { inviteToken, action } = req.params;

    const invitation: Invitation = {
      status: 'no-login',
      groupTitle: '',
    };

    req.store.invitation = invitation;

    const login: string | undefined = req.account?.user.login;

    if (login === undefined) {
      next();
      return;
    }

    const dbUser = await UserModel.findOne({ login });
    if (dbUser === null) {
      res.sendStatus(500);
      return;
    }

    const dbGroup = await GroupModel.findOne({ inviteToken });
    if (dbGroup === null) {
      invitation.status = 'no-group';
      next();
      return;
    }

    invitation.groupTitle = dbGroup.title;

    if (action === 'vstoupit') {
      const result = await dbUser.updateOne({ $addToSet: { groups: dbGroup.id } });
      if (result.modifiedCount === 0) {
        invitation.status = 'already-joined';
      } else {
        invitation.status = 'joined';
      }
    } else if (action === 'opustit') {
      const result = await dbUser.updateOne({ $pull: { groups: dbGroup.id } });
      if (result.modifiedCount === 0) {
        invitation.status = 'already-left';
      } else {
        invitation.status = 'left';
      }
    } else {
      res.sendStatus(404);
      return;
    }

    next();
  });

  router.get('/kurzy/:course/:chapter', (req, res) => {
    res.redirect(301, `/kurzy/${req.params.course}/#${req.params.chapter}`);
  });

  router.use(async (req, res) => {
    const accessUser: User = {
      login: req.account?.user.login ?? '',
      access: req.account === undefined ? 'public' : 'registered',
    };

    let defaultAccessCheck: AccessCheck = AccessClaimCheck.create(
      accessUser,
      '/kurzy',
    );

    if (config.defaultAccess === 'granted') {
      defaultAccessCheck = new AccessGrantAll();
    } else if (config.defaultAccess.claims !== undefined) {
      defaultAccessCheck = AccessClaimCheck.create(
        accessUser,
        ...config.defaultAccess.claims.content,
      );
    }

    const httpStatusRef = { status: 200 };

    const app = () => (
      <ServerContextProvider
        cms={cms}
        account={req.account ?? null}
        accessCheck={req.account === undefined
          ? defaultAccessCheck
          : AccessClaimCheck.create(accessUser, ...req.account.claims.content)}
        store={req.store}
        logins={{
          githubClientId: config.githubApp.clientId,
        }}
        url={req.originalUrl}
        serverUrl={config.serverUrl}
        httpStatusRef={httpStatusRef}
      >
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
      </ServerContextProvider>
    );

    const element = createElement(app);
    await ssrPrepass(element);
    const appContent = renderToString(element);
    const helmet = Helmet.renderStatic();

    res.status(httpStatusRef.status);
    return res.send(`<!DOCTYPE html>
      <html ${helmet.htmlAttributes.toString()}>
        <head>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
          ${helmet.script.toString()}
        </head>
        <body ${helmet.bodyAttributes.toString()}>
          <script>
            window.__STORE__ = ${json5.stringify(req.store)}
          </script>
          <script defer src="/${stats.bundle}"></script>
          <div id="app">${appContent}</div>
        </body>
      </html>
    `);
  });

  return router;
};
