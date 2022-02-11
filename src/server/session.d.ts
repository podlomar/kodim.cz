// Hack: https://github.com/expressjs/session/issues/807
import { Session } from 'express-session'
import { Access } from 'kodim-cms/esm/content/access.js';
import { User } from './db.js';

declare module 'express-session' {
  interface SessionData {
    user: User;
    claims: string[];
  }
}