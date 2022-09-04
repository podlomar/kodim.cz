import type { Store } from '../common/AppContext';

export {};

declare global {
  interface ParsedToken {
    iat: number
    login: string
  }

  namespace Express {
    interface Request {
      auth?: ParsedToken
      store: Store,
    }
  }
}
