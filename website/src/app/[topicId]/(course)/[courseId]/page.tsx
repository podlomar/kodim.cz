import type { JSX } from "react";
import { notFound, redirect } from 'next/navigation';
import { agnosticAgent, cms } from 'lib/cms';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{
    topicId: string;
    courseId: string;
  }>
}

const CoursePage = async (props: Props): Promise<JSX.Element> => {
  const params = await props.params;
  const { topicId, courseId } = params;
  const course = await cms().loadCourse(agnosticAgent, topicId, courseId);

  if (course === null) {
    notFound();
  }

  redirect(`${courseId}/${course.chapters[0].name}`);
};

export default CoursePage;
