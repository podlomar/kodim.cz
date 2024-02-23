import { NextResponse } from 'next/server'
import { cms } from 'lib/cms';

export const dynamic = 'force-dynamic';

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const [_, topicId, courseId] = url.pathname.split('/');

  const result = await cms().reindexCourse(topicId, courseId);

  if (result === 'not-found') {
    return new NextResponse(`No such course at ${topicId}/${courseId}`, { status: 404 });
  }

  return NextResponse.redirect(`${process.env.WEBSITE_URL}/${topicId}/${courseId}`);
}
