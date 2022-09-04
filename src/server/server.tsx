import express, { ErrorRequestHandler, Request } from 'express';
import fs from 'fs';
import json5 from 'json5';
import bcrypt from 'bcrypt';
import { KodimCms } from 'kodim-cms';
import { CmsApp } from 'kodim-cms/esm/server.js';
import mongoose from 'mongoose';
import axios from 'axios';
import queryString from 'query-string';
import { AccessGrantAll } from 'kodim-cms/esm/content/access-check.js';
import { expressjwt } from 'express-jwt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { api } from './api';
import { UserModel } from './db';
import { createAppController } from './app';

const config = json5.parse(fs.readFileSync('./server-config.json5', 'utf-8'));

await mongoose.connect(config.dbUrl);

const cms = await KodimCms.load(config.contentDir, `${config.serverUrl}/cms`);

const cmsApp = new CmsApp(cms, () => new AccessGrantAll());

const appController = createAppController(config, cms);

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(
  expressjwt({
    secret: config.sessionSecret,
    algorithms: ['HS256'],
    credentialsRequired: false,
    getToken: (req: Request) => {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
      }
      return req.cookies.token;
    },
  }),
);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send(`
      <!DOCTYPE html>
      <html lang="cs">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>401</title>
        </head>
        <body>
          <pre>Chyba 401: Chybné přihlašovací údaje. Zkuste vymazat cookies</pre>
        </body>
      </html>
    `);
  } else {
    next(err);
  }
};

server.use(errorHandler);

server.use('/assets', express.static('./assets', { fallthrough: false }));
server.use('/js', express.static('./js', { fallthrough: false }));
server.use('/changelog', express.static('../changelog', { fallthrough: false }));

server.use('/cms', cmsApp.router);
server.use('/api', api);

server.use((req, res, next) => {
  req.store = {};
  next();
});

server.get('/odhlasit', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

server.get('/prihlasit/github', async (req, res) => {
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
      email: githubUser.email ?? undefined,
      groups: [],
    });
    await dbUser.save();
  }

  const user = dbUser.toObject();

  const token = jwt.sign({ login: user.login }, config.sessionSecret);
  res.cookie('token', token);
  res.redirect(returnUrl);
});

server.post('/prihlasit', async (req, res) => {
  const returnUrl = typeof req.query.returnUrl === 'string' ? req.query.returnUrl : '/';
  const { loginOrEmail, password } = req.body;

  console.log(req.body);

  if (typeof password !== 'string' || typeof loginOrEmail !== 'string') {
    res.sendStatus(400);
    return;
  }

  const dbUser = await UserModel.findOne(
    loginOrEmail.includes('@') ? { email: loginOrEmail } : { login: loginOrEmail },
  );

  if (dbUser === null) {
    req.store.badCredentials = true;
    await appController(req, res);
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(password, dbUser.password!);
  if (!isPasswordCorrect) {
    req.store.badCredentials = true;
    await appController(req, res);
    return;
  }

  const token = jwt.sign({ login: dbUser.login }, config.sessionSecret);
  res.cookie('token', token);
  res.redirect(returnUrl);
});

server.use('/prihlasit', (req, res, next) => {
  const returnUrl = typeof req.query.returnUrl === 'string' ? req.query.returnUrl : '/';
  if (req.auth !== undefined) {
    res.redirect(returnUrl);
    return;
  }
  next();
});

server.get('/kurzy/:course/:chapter', (req, res) => {
  res.redirect(301, `/kurzy/${req.params.course}/#${req.params.chapter}`);
});

server.get('*', appController);

server.listen(config.port, () => {
  console.info(`Serving on localhost:${config.port}`);
});
