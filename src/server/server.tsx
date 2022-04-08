import express from 'express';
import fs from 'fs';
import json5 from 'json5';
import { createElement } from 'react';
import ssrPrepass from 'react-ssr-prepass';
import { renderToString } from 'react-dom/server.js';
import { StaticRouter } from 'react-router-dom/server.js';
import { KodimCms } from 'kodim-cms';
import { CmsApp } from 'kodim-cms/esm/server.js';
import mongoose from 'mongoose';
import axios from 'axios';
import queryString from 'query-string';
import sessions from 'express-session';
import {
  AccessCheck, AccessClaimCheck, AccessGrantAll, User,
} from 'kodim-cms/esm/content/access-check.js';
import { Helmet } from 'react-helmet';
import { api } from './api';
import { Claims, UserModel } from './db';
import { ServerContextProvider, Store } from '../common/AppContext';
import App from '../common/App';

const config = json5.parse(fs.readFileSync('./server-config.json5', 'utf-8'));
const stats = json5.parse(fs.readFileSync('./stats.json5', 'utf-8'));

await mongoose.connect(config.dbUrl);

const cms = await KodimCms.load(
  config.contentDir,
  `${config.serverUrl}/cms`,
);

const cmsApp = new CmsApp(cms, () => new AccessGrantAll());

const server = express();
server.use(express.json());
server.use(sessions({
  secret: config.sessionSecret,
  saveUninitialized: true,
  resave: false,
}));

server.use('/assets', express.static('./assets', { fallthrough: false }));
server.use('/js', express.static('./js', { fallthrough: false }));
server.use('/changelog', express.static('../changelog', { fallthrough: false }));

server.use('/cms', cmsApp.router);
server.use('/api', api);

server.get('/odhlasit', (req, res) => {
  req.session.account = undefined;
  res.redirect('/');
});

server.get('/prihlasit/github', async (req, res) => {
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
  const { data: githubUser } = await axios.get(
    'https://api.github.com/user',
    {
      headers: {
        Accept: 'application/json',
        Authorization: `token ${parsed.access_token}`,
      },
    },
  );

  let dbUser = await UserModel.findOne({ login: githubUser.login });

  if (dbUser === null) {
    dbUser = new UserModel({
      login: githubUser.login,
      name: githubUser.name ?? githubUser.login,
      avatarUrl: githubUser.avatar_url,
      email: githubUser.email ?? undefined,
      groups: [],
    });
    await dbUser.save();
  }

  await dbUser.populate('groups');
  const user = dbUser.toObject();
  const claims: Claims = user.groups.reduce((acc: Claims, group): Claims => ({
    content: [...acc.content, ...group.claims.content],
    web: [...acc.web, ...group.claims.web],
  }), { content: [], web: [] });

  console.log('claims', claims);

  req.session.account = { user, claims };
  res.redirect(req.session.returnUrl ?? '/');
});

server.use('/prihlasit', (req, res, next) => {
  const returnUrl = typeof req.query.returnUrl === 'string' ? req.query.returnUrl : '/';
  if (req.session.account !== undefined) {
    res.redirect(returnUrl);
    return;
  }
  req.session.returnUrl = returnUrl;
  next();
});

server.get('/kurzy/:course/:chapter', (req, res) => {
  res.redirect(301, `/kurzy/${req.params.course}/#${req.params.chapter}`);
});

server.get('*', async (req, res) => {
  const store: Store = {};

  const accessUser: User = {
    login: req.session.account?.user.login ?? '',
    access: req.session.account === undefined ? 'public' : 'registered',
  };

  let defaultAccessCheck: AccessCheck = AccessClaimCheck.create(accessUser, '/kurzy');

  if (config.defaultAccess === 'granted') {
    defaultAccessCheck = new AccessGrantAll();
  } else if (config.defaultAccess.claims !== undefined) {
    defaultAccessCheck = AccessClaimCheck.create(
      accessUser,
      ...config.defaultAccess.claims.content,
    );
  }

  const app = () => (
    <ServerContextProvider
      cms={cms}
      account={req.session.account ?? null}
      accessCheck={req.session.account === undefined
        ? defaultAccessCheck
        : AccessClaimCheck.create(accessUser, ...req.session.account.claims.content)}
      store={store}
      logins={{
        githubClientId: config.githubApp.clientId,
      }}
      url={req.originalUrl}
      baseUrl={config.serverUrl}
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
  res.send(`<!DOCTYPE html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${helmet.script.toString()}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        <script>
          window.__STORE__ = ${json5.stringify(store)}
        </script>
        <script defer src="/${stats.bundle}"></script>
        <div id="app">${appContent}</div>
      </body>
    </html>
  `);
});

server.listen(config.port, () => {
  console.info(`Serving on localhost:${config.port}`);
});
