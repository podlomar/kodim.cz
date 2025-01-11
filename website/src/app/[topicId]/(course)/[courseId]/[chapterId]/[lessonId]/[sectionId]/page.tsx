import { cache, type JSX } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next'
import { openGraph } from 'app/open-graph';
import { agnosticAgent, cms } from 'lib/cms';
import { Lesson } from 'kodim-cms/esm/content/lesson';
import LessonBanner from 'app/components/LessonBanner';
import SectionContent from 'app/components/SectionContent';
import { MenuItem } from 'app/components/Menu';
import Breadcrumbs from 'app/components/Breadcrumbs';
import { session } from 'app/session';
import { CmsAgent } from 'kodim-cms/esm/access-control/claim-agent';
import ArticleView from 'app/components/ArticleView/intex';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{
    topicId: string;
    courseId: string;
    chapterId: string;
    lessonId: string;
    sectionId: string;
  }>
}

const getLesson = cache(
  async (
    cmsAgent: CmsAgent,
    topicId: string,
    courseId: string,
    chapterId: string,
    lessonId: string,
  ): Promise<Lesson | null> => (
    cms().loadLesson(cmsAgent, topicId, courseId, chapterId, lessonId)
  )
);

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { topicId, courseId, chapterId, lessonId } = params;
  const { cmsAgent } = await session();
  const lesson = await getLesson(cmsAgent, topicId, courseId, chapterId, lessonId);

  if (lesson === null) {
    notFound();
  }

  if (lesson.locked) {
    notFound();
  }

  return {
    title: lesson.title,
    description: lesson.lead,
    openGraph: {
      ...openGraph,
      type: 'article',
      title: lesson.title,
      description: lesson.lead ?? undefined,
      url: lesson.path,
    },
  }
}

const LessonPage = async (props: Props): Promise<JSX.Element> => {
  const params = await props.params;
  const { topicId, courseId, chapterId, lessonId, sectionId } = params;
  const { cmsAgent } = await session();
  const lesson = await getLesson(cmsAgent, topicId, courseId, chapterId, lessonId);
  if (lesson === null) {
    notFound();
  }

  const section = await cms().loadSection(agnosticAgent, topicId, courseId, chapterId, lessonId, sectionId);
  if (section === null) {
    notFound();
  }

  const navItems = lesson.sections.map((sec): MenuItem => ({
    href: sec.path,
    key: sec.name,
    label: sec.title,
  }));

  return (
    <div className="container">
      <Breadcrumbs crumbs={section.crumbs.slice(0, -1)} />
      <LessonBanner lesson={lesson} />
      <ArticleView
        navItems={navItems}
        activeNavKey={section.name}
        next={section.next?.path ?? null}
        prev={section.prev?.path ?? null}
      >
        <SectionContent section={section} />
      </ArticleView>
    </div>
  );
};

export default LessonPage;
