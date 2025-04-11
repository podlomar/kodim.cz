import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const returnTo = req.nextUrl.searchParams.get('returnTo') ?? '/';
  const response = NextResponse.redirect(`${process.env.PROJECT_URL}${returnTo}`);
  response.cookies.set('session_token', '', {
    path: '/',
    domain: process.env.SESSION_COOKIE_DOMAIN,
    expires: new Date(0),
  });
  return response;
}
