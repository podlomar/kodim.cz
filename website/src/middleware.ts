import { AuthenticationData, createDirectus, rest, refresh, readMe, staticToken } from '@directus/sdk';
import sessionStore, { SessionData } from 'lib/session';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const client = createDirectus('http://directus2:8055')
  .with(rest());

const fetchAuthData = async (refreshToken: string): Promise<AuthenticationData | null> => {
  return client.request(refresh('json', refreshToken));
};

const fetchCurrentUserId = async (accessToken: string): Promise<string | null> => {
  const authClient = client.with(staticToken(accessToken));
  const user = await authClient.request(readMe({ fields: ['id'] }));
  return user.id;
};

const setupSession = async (request: NextRequest): Promise<SessionData | null> => {
  const refreshToken = request.cookies.get('directus_refresh_token')?.value;
  if (refreshToken === undefined) {
    return null;
  }

  const authenticationData = await fetchAuthData(refreshToken);  
  if (authenticationData === null) {
    return null;
  }

  if (authenticationData.access_token === null || authenticationData.refresh_token === null) {
    return null;
  }

  const userId = await fetchCurrentUserId(authenticationData.access_token);  
  if (userId === null) {
    return null;
  }

  return sessionStore.init(userId, authenticationData.refresh_token);
};

export const middleware = async (request: NextRequest): Promise<NextResponse> => {
  const storedSessionId = request.cookies.get('session_id')?.value;
  const sessionData = storedSessionId !== undefined ? sessionStore.get(storedSessionId) : null;
  
  try {
    if (sessionData === null) {
      const session = await setupSession(request);
      if (session === null) {
        const response = NextResponse.next();
        response.cookies.delete('session_id');
        return NextResponse.next();
      }

      const headers = new Headers(request.headers);
      headers.set('x-user-id', session.userId);
      const response = NextResponse.next({
        request: {
          headers,
        },
      });
      response.cookies.set('session_id', session.sessionId);
      response.cookies.set('directus_refresh_token', session.refreshToken);
      return response;
    }

    const headers = new Headers(request.headers);
    headers.set('x-user-id', sessionData.userId);
    return NextResponse.next({
      request: {
        headers,
      },
    });
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
