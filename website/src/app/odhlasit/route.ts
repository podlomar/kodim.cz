import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const returnTo = req.nextUrl.searchParams.get('returnTo') ?? '/';
  const response = NextResponse.redirect(`${process.env.WEBSITE_URL}${returnTo}`);
  response.cookies.delete('session_token');
  return response;
}
