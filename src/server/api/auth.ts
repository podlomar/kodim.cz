import express, { Router } from 'express';
import { AccessCheck, AccessClaimCheck } from 'kodim-cms/esm/content/access-check.js';
import { getAccount } from '../db';

export const auth = (config: any): Router => {
  const router = express.Router();

  router.use(async (req, res, next) => {
    const originalPath: string = req.path;
    const method = req.method.toLowerCase();
    const authorisationPath = `/api/${method}${originalPath}`;

    //TODO: for applications, get claims from auth token
    if (originalPath.startsWith('/admin') && req.auth?.scp === 'app') {
      res.status(403);
      res.send();
      return;
    }

    //TODO: create Admins group instead of config.admins
    const login: string | undefined = req.auth?.usr;
    if (originalPath.startsWith('/admin') && !config.admins.includes(login ?? '')) {
      res.status(403);
      res.send();
      return;
    }

    const account = await getAccount(login ?? null);

   //TODO User --> GeneralUser
    let claimCheck: AccessCheck = AccessClaimCheck.create(account.user, ...account.claims.content);

    authorisationPath.split('/').slice(1).forEach((pathPart) => {
      //TODO simple Entry
      claimCheck = claimCheck.step({link: pathPart});
    });

    const accessAllowed = claimCheck.accepts();
    if (!accessAllowed) {
      res.status(403);
      res.send();
      return;
    }

    next();
  });

  return router;
};
