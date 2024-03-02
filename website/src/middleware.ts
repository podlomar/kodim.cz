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
      return invalidSession;
    }

    return noneSession;
  }
  
  const sessionData = sessionCookie === undefined ? null : decryptSessionData(sessionCookie);
  if (sessionData === null || sessionData.refreshToken !== refreshToken) {
    const authenticationData = await fetchAuthData(refreshToken);  
    if (authenticationData === null) {
      return invalidSession;
    }

    if (authenticationData.access_token === null || authenticationData.refresh_token === null) {
      return invalidSession;
    }

    const userId = await fetchCurrentUserId(authenticationData.access_token);  
    if (userId === null) {
      return invalidSession;
    }

    return {
      status: 'stale',
      data: {
        userId,
        refreshToken: authenticationData.refresh_token,
      }
    };
  }

  return {
    status: 'valid',
    data: sessionData,
  };
};

export const middleware = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const session = await loadSession(request);
    const response = NextResponse.next();

    // This is a hack to pass the current pathname to pages because fucking Next.js doesn't provide it
    response.headers.set('x-pathname', request.nextUrl.pathname);

    if (session.status === 'invalid') {
      response.cookies.delete('session');
      response.headers.set('x-session', 'invalid');
    } else if (session.status === 'stale') {
      const encryptedSession = encryptSessionData(session.data);
      response.cookies.set('session', encryptedSession);
      response.cookies.set('directus_refresh_token', session.data.refreshToken);
      response.headers.set('x-session', encryptedSession);
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
