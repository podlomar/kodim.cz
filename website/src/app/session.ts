import { cache } from 'react';
import { cookies, headers } from 'next/headers';
import { ClaimsAgent, CmsAgent, publicAgent } from 'kodim-cms/esm/access-control/claim-agent';
import { User, fetchUser } from '../lib/directus';
import { decryptSessionData } from '../lib/session';

export type Session = {
  user: User | null;
  refreshToken: string;
  cmsAgent: CmsAgent;
};

export const session = cache(async (noRedirect?: 'no-redirect'): Promise<Session> => {
  const publicSession = { user: null, cmsAgent: publicAgent, refreshToken: '' };
  const encryptedSession = (await headers()).get('x-session') ?? (await cookies()).get('session')?.value;
  if(encryptedSession === undefined) {
    return publicSession;
  }

  const sessionData = decryptSessionData(encryptedSession);
  if (sessionData === null) {
    return publicSession;
  }

  const user = await fetchUser(sessionData.userId);
  if (user === null) {
    return publicSession;
  }
  
  const cmsAgent = new ClaimsAgent(user.accessRules);
  return { user, cmsAgent, refreshToken: sessionData.refreshToken };
});
