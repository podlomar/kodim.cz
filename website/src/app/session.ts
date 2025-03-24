import { cache } from 'react';
import { cookies } from 'next/headers';
import { ClaimsAgent, CmsAgent, publicAgent } from 'kodim-cms/esm/access-control/claim-agent';
import { User, getCurrentUser } from '../lib/directus';

export type Session = {
  user: User | null;
  cmsAgent: CmsAgent;
};

export const session = cache(async (): Promise<Session> => {
  const publicSession = { user: null, cmsAgent: publicAgent };
  const cookiesStore = await cookies();
  const sessionToken = cookiesStore.get('session_token')?.value;
  if (sessionToken === undefined) {
    return publicSession;
  }

  const user = await getCurrentUser(sessionToken);
  if (user === null) {
    return publicSession;
  }

  const cmsAgent = new ClaimsAgent(user.accessRules);
  return { user, cmsAgent };
});
