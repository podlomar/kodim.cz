import { cache } from 'react';
import { headers } from 'next/headers';
import { ClaimsAgent, PublicAgent } from 'kodim-cms/esm/access-control/claim-agent';
import { fetchUser } from '../lib/directus';
import { Session } from '../lib/session';

export const session = cache(async (): Promise<Session> => {
  const userId = headers().get('x-user-id');
  if (userId === null) {
    return { user: null, cmsAgent: new PublicAgent() };
  }

  const user = await fetchUser(userId);
  console.log('userAccessRules', user.accessRules);
  const cmsAgent = new ClaimsAgent(user.accessRules);
  return { user, cmsAgent };
});
