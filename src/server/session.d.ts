// Hack: https://github.com/expressjs/session/issues/807
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Session } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    returnUrl: string;
  }
}
