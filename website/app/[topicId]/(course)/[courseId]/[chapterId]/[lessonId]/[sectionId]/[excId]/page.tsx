import { cache } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next'
import { cms } from 'lib/cms';
import { pageTitle } from 'lib/page-title';
import { Exercise } from 'kodim-cms/esm/content/exercise';
import { MenuItem } from 'components/Menu';
import Breadcrumbs from 'components/Breadcrumbs';
import LessonBanner from 'components/LessonBanner';
import ReactHast from 'components/ReactHast';
import ArticleContent from 'components/ArticleContent/intex';
import ExerciseHead from 'components/ExerciseHead';
import Solution from 'components/Solution';

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    topicId: string;
    courseId: string;
    chapterId: string;
    lessonId: string;
    sectionId: string;
    excId: string;
  }
}

const getExercise = cache(
  async (
    topicId: string,
    courseId: string,
    chapterId: string,
    lessonId: string,
    sectionId: string,
    excId: string,
  ): Promise<Exercise | null> => (
    cms.loadExercise(topicId, courseId, chapterId, lessonId, sectionId, excId)
  )
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topicId, courseId, chapterId, lessonId, sectionId, excId } = params;
  const exercise = await getExercise(
    topicId, courseId, chapterId, lessonId, sectionId, excId
  );
 
  if (exercise === null) {
    notFound();
  }

  const title = pageTitle(`Cvičení: ${exercise.title}`);

  return {
    title,
    description: exercise.lead,
    openGraph: {
      title,
      description: exercise.lead,
      url: exercise.path,
    },
  }
}

const ExercisePage = async ({ params }: Props): Promise<JSX.Element> => {
  const { topicId, courseId, chapterId, lessonId, sectionId, excId } = params;
  const lesson = await cms.loadLesson(topicId, courseId, chapterId, lessonId);
  const exercise = await getExercise(
    topicId, courseId, chapterId, lessonId, sectionId, excId
  );

  if (exercise === null || lesson === null) {
    notFound();
  }

  const navItems = lesson.sections.map((sec): MenuItem => ({
    href: sec.path,
    key: sec.name,
    label: sec.title,
  }));

  return (
    <div className="container">
      <Breadcrumbs crumbs={exercise.crumbs} />
      <LessonBanner lesson={lesson} />
      <ArticleContent 
        navItems={navItems}
        activeNavKey={sectionId}
        head={<ExerciseHead exercise={exercise} link={false} />}
      >
        <ReactHast root={exercise.assign} />
        {exercise.solution !== 'none' && <Solution root={exercise.solution} />}
      </ArticleContent>
    </div>
  );
};

export default ExercisePage;
