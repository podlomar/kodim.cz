import jwt from 'jwt-simple';
import { type NextRequest, NextResponse } from 'next/server'
import { refreshSession } from 'lib/directus';

export const middleware = async (request: NextRequest): Promise<NextResponse> => {
  const sessionToken = request.cookies.get('session_token')?.value;
  const response = NextResponse.next();
  if (sessionToken === undefined || sessionToken === '') {
    return response;
  }
  
  const decoded = jwt.decode(sessionToken, '', true);
  const exp = decoded.exp as number;
  const iat = decoded.iat as number;
  const now = Math.floor(Date.now() / 1000);
  const validPeriod = exp - iat;
  const remains = exp - now;
  
  if (remains < validPeriod / 2) {
    const newSessionCookie = await refreshSession(sessionToken);
    if (newSessionCookie === null) {
      return response;
    }

    response.cookies.set(newSessionCookie);
  }

  return response;
};

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
    },
  ],
};
