import { NextResponse } from 'next/server'
import { cms } from 'lib/cms';

export const dynamic = 'force-dynamic';

export const POST = async (req: Request) => {
  const branch = new URL(req.url).searchParams.get('branch') ?? 'main';
  const body = await req.json();
  const repoUrl = body.repository.clone_url;

  const result = await cms().reindexFromRepo(repoUrl, branch);
  if (result.status === 'error') {
    if (result.code === 'not-found' || result.code === 'no-such-repo') {
      return new NextResponse(result.code, { status: 404 });
    }

    return new NextResponse(result.error, { status: 500 });
  }

  return NextResponse.json(result);
}
