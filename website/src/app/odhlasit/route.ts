import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const url = req.nextUrl.clone();
  url.pathname = '/';
  const response = NextResponse.redirect(url);
  response.cookies.delete('session_id');
  response.cookies.delete('directus_refresh_token');
  return response;
}
