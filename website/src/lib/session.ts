import { v4 as uuid } from 'uuid';
import { User } from './directus';
import { ClaimsAgent, PublicAgent } from 'kodim-cms/esm/access-control/claim-agent';

export interface SessionData {
  sessionId: string;
  refreshToken: string;
  userId: string;
};

export interface Session {
  user: User | null;
  cmsAgent: PublicAgent | ClaimsAgent;
}

class SessionStore {
  private static instanceCount = 0;
  private sessions: {
    [Key: string]: SessionData;
  } = {};
  
  public constructor() {
    SessionStore.instanceCount++;
  }

  public get(sessionId: string): SessionData | null {
    return this.sessions[sessionId] ?? null;
  }

  public init(userId: string, refreshToken: string): SessionData {
    const sessionId = uuid();
    const data = {
      sessionId,
      userId,
      refreshToken,
    };
    this.sessions[sessionId] = data;
    return data;
  }

  public current(headers: Headers): SessionData | null {
    const sessionId = headers.get('x-session-id');
    if (sessionId === null) {
      return null;
    }

    return this.get(sessionId);
  }
};

let sessionStore: SessionStore;

if (process.env.NODE_ENV === 'development') {
  if ((global as any).sessionStore === undefined) {
    (global as any).sessionStore = new SessionStore();
  }
  sessionStore = (global as any).sessionStore;
} else {
  sessionStore = new SessionStore();
}

export default sessionStore;
