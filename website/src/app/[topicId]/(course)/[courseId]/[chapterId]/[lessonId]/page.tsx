import { session } from 'app/session';
import { cms } from 'lib/cms';
import { notFound, redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    topicId: string;
    courseId: string;
    chapterId: string;
    lessonId: string;
  }
}

const LessonPage = async ({ params }: Props): Promise<JSX.Element> => {
  const { topicId, courseId, chapterId, lessonId } = params;
  const { cmsAgent } = await session();
  const lesson = await cms().loadLesson(`/${topicId}/${courseId}/${chapterId}/${lessonId}`);

  if (lesson === 'not-found') {
    notFound();
  }
  
  // if (lesson.locked) {
  //   notFound();
  // }

  if (lesson.sections.length === 0) {
    notFound();
  }

  redirect(`${lessonId}/${lesson.sections[0].name}`);
};

export default LessonPage;
