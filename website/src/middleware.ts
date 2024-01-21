import { AuthenticationData, createDirectus, rest, refresh, readMe, staticToken } from '@directus/sdk';
import { SessionData, decryptSessionData, encryptSessionData } from 'lib/session';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const client = createDirectus('http://directus:8055')
  .with(rest());

const fetchAuthData = async (refreshToken: string): Promise<AuthenticationData | null> => {
  return client.request(refresh('json', refreshToken));
};

const fetchCurrentUserId = async (accessToken: string): Promise<string | null> => {
  const authClient = client.with(staticToken(accessToken));
  const user = await authClient.request(readMe({ fields: ['id'] }));
  return user.id;
};

const noneSession = {
  status: 'none',
} as const;

const invalidSession = {
  status: 'invalid',
} as const;

type NoneSession = typeof noneSession;

type InvalidSession = typeof invalidSession;

interface ValidSession {
  status: 'valid';
  data: SessionData;
}

interface StaleSession {
  status: 'stale';
  data: SessionData;
}

type StoredSession = NoneSession | InvalidSession | ValidSession | StaleSession;

const loadSession = async (request: NextRequest): Promise<StoredSession> => {
  const sessionCookie = request.cookies.get('session')?.value;
  const refreshToken = request.cookies.get('directus_refresh_token')?.value;
  
  if (refreshToken === undefined) {
    if (sessionCookie !== undefined) {
      console.log('SESSION:', 'missing refresh token, cancelling');
      return invalidSession;
    }

    console.log('SESSION:', 'missing refresh token, no session found');
    return noneSession;
  }
  
  const sessionData = sessionCookie === undefined ? null : decryptSessionData(sessionCookie);
  console.log('sesionData', sessionData);
  if (sessionData === null || sessionData.refreshToken !== refreshToken) {
    const authenticationData = await fetchAuthData(refreshToken);  
    if (authenticationData === null) {
      console.log('SESSION:', 'invalid refresh token, cancelling');
      return invalidSession;
    }

    if (authenticationData.access_token === null || authenticationData.refresh_token === null) {
      console.log('SESSION:', 'invalid refresh token auth, cancelling');
      return invalidSession;
    }

    const userId = await fetchCurrentUserId(authenticationData.access_token);  
    if (userId === null) {
      console.log('SESSION:', 'invalid access token, cancelling');
      return invalidSession;
    }

    console.log('SESSION:', 'refreshing session');

    return {
      status: 'stale',
      data: {
        userId,
        refreshToken: authenticationData.refresh_token,
      }
    };
  }

  console.log('SESSION:', 'continuing session');
  return {
    status: 'valid',
    data: sessionData,
  };
};

export const middleware = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const session = await loadSession(request);
    const response = NextResponse.next();

    if (session.status === 'invalid') {
      response.cookies.delete('session');
    } else if (session.status === 'stale') {
      response.cookies.set('session', encryptSessionData(session.data));
      response.cookies.set('directus_refresh_token', session.data.refreshToken);
    }
      
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.next();
  }
};

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
    },
  ],
};
