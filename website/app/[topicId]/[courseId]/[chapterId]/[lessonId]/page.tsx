import { LessonContentType } from 'kodim-cms/esm/content/lesson';
import { cms } from 'lib/cms';
import { redirect } from 'next/navigation';

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
  const lesson = await cms.loadContent(
    cms.rootCursor().navigate(topicId, courseId, chapterId, lessonId),
    LessonContentType
  );

  if (lesson === null) {
    return <div>Failed to load content</div>;
  }
  
  redirect(`${lessonId}/${lesson.sections[0].name}`);
};

export default LessonPage;
