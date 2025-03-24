import { NextResponse } from 'next/server'

interface Params {
  params: Promise<{
    path: string[];
  }>
}

export const GET = async (req: Request, props: Params) => {
  const params = await props.params;
  const { path } = params;
  
  const response = await fetch(
    `http://directus:8055/assets/${path.join('/')}`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
      },
    }
  );
  return new NextResponse(response.body);
};
