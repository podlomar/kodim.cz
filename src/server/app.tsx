import fs from 'fs';
import { createElement } from 'react';
import { Request, Response } from 'express';
import json5 from 'json5';
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
import { getAccount } from './account';
import { ServerContextProvider } from '../common/AppContext';
import App from '../common/App';

const stats = json5.parse(fs.readFileSync('./stats.json5', 'utf-8'));

export const createAppController = (
  config: any,
  cms: KodimCms,
) => async (
  req: Request,
  res: Response,
) => {
  const login = req.auth?.login;
  const account = login === undefined ? null : (await getAccount(login));

  const accessUser: User = {
    login: account?.user.login ?? '',
    access: account === undefined ? 'public' : 'registered',
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

  const app = () => (
    <ServerContextProvider
      cms={cms}
      account={account}
      accessCheck={account === null
        ? defaultAccessCheck
        : AccessClaimCheck.create(accessUser, ...account.claims.content)}
      store={req.store}
      logins={{
        githubClientId: config.githubApp.clientId,
      }}
      url={req.originalUrl}
      serverUrl={config.serverUrl}
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
};
