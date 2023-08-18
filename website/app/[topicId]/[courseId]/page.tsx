import { cms } from 'lib/cms';
import { CourseContentType } from 'kodim-cms/esm/content/course';
import { redirect } from 'next/navigation';

interface Props {
  params: {
    topicId: string;
    courseId: string;
  }
}

const CoursePage = async ({ params }: Props): Promise<JSX.Element> => {
  const { topicId, courseId } = params;
  const course = await cms.loadContent(
    cms.rootCursor().navigate(topicId, courseId),
    CourseContentType
  );

  if (course === null) {
    return <div>Failed to load content</div>;
  }
  
  redirect(`${courseId}/${course.chapters[0].name}`);
};

export default CoursePage;
