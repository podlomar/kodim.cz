import { notFound, redirect } from 'next/navigation';
import { cms } from 'lib/cms';

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    topicId: string;
    courseId: string;
  }
}

const CoursePage = async ({ params }: Props): Promise<JSX.Element> => {
  const { topicId, courseId } = params;
  const course = await cms.loadCourse(topicId, courseId);

  if (course === null) {
    notFound();
  }
  
  redirect(`${courseId}/${course.chapters[0].name}`);
};

export default CoursePage;
