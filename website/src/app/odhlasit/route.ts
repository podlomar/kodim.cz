import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const returnTo = req.nextUrl.searchParams.get('returnTo') ?? '/';
  const response = NextResponse.redirect(`${process.env.WEBSITE_URL}${returnTo}`);
  response.cookies.set('session_token', '', {
    path: '/',
    domain: '.kodim.cz', // Explicitly match the original domain
    expires: new Date(0), // Expire the cookie immediately
  });
  return response;
}
