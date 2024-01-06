import { NextResponse } from 'next/server'
import { cms } from 'lib/cms';

export const POST = async (req: Request) => {
  const branch = new URL(req.url).searchParams.get('branch') ?? 'main';
  const body = await req.json();

  const repoUrl = body.repository.clone_url;

  const result = await cms.reindexFromRepo(repoUrl, branch);

  if (result === 'not-found') {
    return new NextResponse('Not found', { status: 404 });
  }

  return NextResponse.json(result);
}
