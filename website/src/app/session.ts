import { cache } from 'react';
import { cookies, headers } from 'next/headers';
import { ClaimsAgent, PublicAgent } from 'kodim-cms/esm/access-control/claim-agent';
import { User, fetchUser } from '../lib/directus';
import { decryptSessionData } from '../lib/session';

export type Session = {
  user: User | null;
  cmsAgent: ClaimsAgent | PublicAgent;
};

export const session = cache(async (): Promise<Session> => {
  const publicSession = { user: null, cmsAgent: new PublicAgent() };
  const sessionCookie = cookies().get('session')?.value;
  if(sessionCookie === undefined) {
    return publicSession;
  }

  const sessionData = decryptSessionData(sessionCookie);
  console.log('app sessionData', sessionData);
  const user = await fetchUser(sessionData.userId);
  console.log('app user', user);
  const cmsAgent = new ClaimsAgent(user.accessRules);
  return { user, cmsAgent };
});
