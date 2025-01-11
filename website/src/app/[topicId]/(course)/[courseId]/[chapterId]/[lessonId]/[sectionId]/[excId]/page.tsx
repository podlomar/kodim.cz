import { cache, type JSX } from 'react';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next'
import { openGraph } from 'app/open-graph';
import { agnosticAgent, cms } from 'lib/cms';
import { Exercise } from 'kodim-cms/esm/content/exercise';
import { MenuItem } from 'app/components/Menu';
import Breadcrumbs from 'app/components/Breadcrumbs';
import LessonBanner from 'app/components/LessonBanner';
import ReactHast from 'app/components/ReactHast';
import ExerciseHead from 'app/components/ExerciseHead';
import Solution from 'app/components/Solution';
import { CmsAgent } from 'kodim-cms/esm/access-control/claim-agent';
import { session } from 'app/session';
import ArticleView from 'app/components/ArticleView/intex';
import Styles from 'app/components/Styles';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{
    topicId: string;
    courseId: string;
    chapterId: string;
    lessonId: string;
    sectionId: string;
    excId: string;
  }>
}

const getExercise = cache(
  async (
    cmsAgent: CmsAgent,
    topicId: string,
    courseId: string,
    chapterId: string,
    lessonId: string,
    sectionId: string,
    excId: string,
  ): Promise<Exercise | null> => (
    cms().loadExercise(cmsAgent, topicId, courseId, chapterId, lessonId, sectionId, excId)
  )
);

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { topicId, courseId, chapterId, lessonId, sectionId, excId } = params;
  const { cmsAgent } = await session();
  const exercise = await getExercise(
    cmsAgent, topicId, courseId, chapterId, lessonId, sectionId, excId
  );

  if (exercise === null) {
    notFound();
  }

  const title = `Cvičení: ${exercise.title}`;

  return {
    title,
    description: exercise.lead,
    openGraph: {
      ...openGraph,
      type: 'article',
      title,
      description: exercise.lead,
      url: exercise.path,
    },
  }
}

const ExercisePage = async (props: Props): Promise<JSX.Element> => {
  const params = await props.params;
  const { topicId, courseId, chapterId, lessonId, sectionId, excId } = params;
  const { cmsAgent } = await session();
  const lesson = await cms().loadLesson(agnosticAgent, topicId, courseId, chapterId, lessonId);
  const section = await cms().loadSection(agnosticAgent, topicId, courseId, chapterId, lessonId, sectionId);
  const exercise = await getExercise(
    cmsAgent, topicId, courseId, chapterId, lessonId, sectionId, excId
  );

  if (exercise === null || section === null || lesson === null) {
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
      <ArticleView
        navItems={navItems}
        activeNavKey={sectionId}
        head={<ExerciseHead exercise={exercise} link={false} />}
        prev={section.prev?.path ?? null}
        next={section.next?.path ?? null}
      >
        <Styles css={exercise.styles} />
        <ReactHast root={exercise.assign} />
        {exercise.solution !== 'none' && <Solution root={exercise.solution} />}
      </ArticleView>
    </div>
  );
};

export default ExercisePage;
