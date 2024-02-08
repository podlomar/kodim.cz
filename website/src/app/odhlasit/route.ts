import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const response = NextResponse.redirect(process.env.WEBSITE_URL!);
  response.cookies.delete('session');
  response.cookies.delete('directus_refresh_token');
  return response;
}
