// Hack: https://github.com/expressjs/session/issues/807
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Session } from 'express-session';
import { Claims, User } from './db.js';

declare module 'express-session' {
  interface SessionData {
    account: {
      user: User;
      claims: Claims;
    }
    returnUrl: string;
  }
}
