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
  const lesson = await cms.loadLesson(topicId, courseId, chapterId, lessonId);
  if (lesson === null) {
    return <div>Failed to load content</div>;
  }
  
  redirect(`${lessonId}/${lesson.sections[0].name}`);
};

export default LessonPage;
