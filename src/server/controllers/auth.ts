import express, { Request, Router } from 'express';
import { expressjwt } from 'express-jwt';
import { Claims, User, UserModel } from '../db';

export type TokenScope = 'all' | 'app';

export interface ParsedToken {
  iat: number,
  usr: string,
  scp: TokenScope,
}

export interface Account {
  user: User;
  claims: Claims;
}

declare global {
  namespace Express {
    interface Request {
      auth?: ParsedToken
      account?: Account,
    }
  }
}

export const authController = (config: any, scope?: TokenScope): Router => {
  const router = express.Router();

  router.use(
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

  router.use(async (req: Request, res, next) => {
    const token = req.auth;
    if (token === undefined) {
      next();
      return;
    }

    if (scope !== undefined && token.scp !== scope) {
      next();
      return;
    }

    const dbUser = await UserModel.findOne({ login: token.usr });
    if (dbUser === null) {
      next();
      return;
    }

    await dbUser.populate('groups');
    const user = dbUser.toObject();
    const claims: Claims = user.groups.reduce(
      (acc: Claims, group): Claims => ({
        content: [...acc.content, ...group.claims.content],
        web: [...acc.web, ...group.claims.web],
      }),
      { content: [], web: [] },
    );

    req.account = { user, claims };
    next();
  });

  return router;
};
