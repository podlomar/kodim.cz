import { NextRequest, NextResponse } from 'next/server'
import { deleteSubscription } from 'lib/directus';

export const GET = async (req: NextRequest) => {
  const searchParams = new URLSearchParams(req.nextUrl.search);
  const email = searchParams.get('email');

  if (email === null) {
    return NextResponse.redirect(`${process.env.WEBSITE_URL!}/odber`);
  }

  await deleteSubscription(email);
  return NextResponse.redirect(`${process.env.WEBSITE_URL!}/odber?status=canceled`);
};
