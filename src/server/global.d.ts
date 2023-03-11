import type { Store } from '../common/AppContext';

export {};

declare global {
  interface ParsedToken {
    iat: number,
    usr: string,
    scp: string,
  }

  namespace Express {
    interface Request {
      auth?: ParsedToken
      store: Store,
    }
  }
}
