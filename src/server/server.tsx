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
import { UserModel } from './db';
import Html from '../common/Html';
import { ServerContextProvider } from '../common/AppContext';
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
server.use(sessions({
  secret: config.sessionSecret,
  saveUninitialized: true,
  resave: false,
}));

server.use('/assets', express.static('./assets', { fallthrough: false }));
server.use('/js', express.static('./js', { fallthrough: false }));

server.use('/cms', cmsApp.router);

server.get('/odhlasit', (req, res) => {
  req.session.user = undefined;
  req.session.claims = undefined;
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
  const { data: user } = await axios.get(
    'https://api.github.com/user',
    {
      headers: {
        Accept: 'application/json',
        Authorization: `token ${parsed.access_token}`,
      },
    },
  );

  console.log('user', user);

  let dbUser = await UserModel.findOne({ login: user.login });

  if (dbUser === null) {
    dbUser = new UserModel({
      login: user.login,
      name: user.name ?? user.login,
      avatarUrl: user.avatar_url,
      email: user.email ?? undefined,
      groups: [],
    });
    await dbUser.save();
  }

  await dbUser.populate('groups');
  req.session.user = dbUser.toObject();
  const claims = req.session.user.groups.flatMap((group) => group.claims);
  // const claims = ['/kurzy'];
  req.session.claims = claims;
  res.redirect('/');
});

server.get('*', async (req, res) => {
  const store = {
    dataEntries: {},
    user: req.session.user ?? null,
  };

  const accessUser: User = {
    login: req.session.user === undefined ? '' : req.session.user.login,
    access: req.session.user === undefined ? 'public' : 'registered',
  };

  let defaultAccessCheck: AccessCheck = AccessClaimCheck.create(accessUser, '/kurzy');

  if (config.defaultAccess === 'granted') {
    defaultAccessCheck = new AccessGrantAll();
  } else if (config.defaultAccess.claims !== undefined) {
    defaultAccessCheck = AccessClaimCheck.create(accessUser, ...config.defaultAccess.claims);
  }

  const html = () => (
    <Html
      store={store}
      bundlePath={`/${stats.bundle}`}
    >
      <ServerContextProvider
        cms={cms}
        accessCheck={req.session.claims === undefined
          ? defaultAccessCheck
          : AccessClaimCheck.create(accessUser, ...req.session.claims)}
        store={store}
        logins={{
          githubClientId: config.githubApp.clientId,
        }}
      >
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
      </ServerContextProvider>
    </Html>
  );

  const element = createElement(html);
  await ssrPrepass(element);
  res.send(renderToString(element));
});

server.listen(config.port, () => {
  console.log(`Serving on localhost:${config.port}`);
});
