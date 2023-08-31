import { cache } from 'react';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next'
import { cms } from 'lib/cms';
import { Lesson } from 'kodim-cms/esm/content/lesson';
import { pageTitle } from 'lib/page-title';
import LessonBanner from 'components/LessonBanner';
import SectionContent from 'components/SectionContent';
import ArticleContent from 'components/ArticleContent/intex';
import { MenuItem } from 'components/Menu';
import StepLink from 'components/StepLink';
import Breadcrumbs from 'components/Breadcrumbs';
import styles from './styles.module.scss';

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    topicId: string;
    courseId: string;
    chapterId: string;
    lessonId: string;
    sectionId: string;
  }
}

const getLesson = cache(
  async (
    topicId: string,
    courseId: string,
    chapterId: string,
    lessonId: string,
  ): Promise<Lesson | null> => (
    cms.loadLesson(topicId, courseId, chapterId, lessonId)
  )
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topicId, courseId, chapterId, lessonId } = params;
  const lesson = await getLesson(topicId, courseId, chapterId, lessonId);
 
  if (lesson === null) {
    notFound();
  }

  return {
    title: pageTitle(lesson.title),
    description: lesson.lead,
    openGraph: {
      title: pageTitle(lesson.title),
      description: lesson.lead,
      type: 'article',
    },
  }
}

const LessonPage = async ({ params }: Props): Promise<JSX.Element> => {
  const { topicId, courseId, chapterId, lessonId, sectionId } = params;
  const lesson = await getLesson(topicId, courseId, chapterId, lessonId);
  if (lesson === null) {
    notFound();
  }

  const section = await cms.loadSection(topicId, courseId, chapterId, lessonId, sectionId);
  if (section === null) {
    notFound();
  }

  const navItems = lesson.sections.map((sec): MenuItem => ({
    href: sec.path,
    key: sec.name,
    label: sec.title,
  }));

  const links = (
    <div className={styles.stepLinks}>
      {
        section.prev === null
          ? <span />
          : <StepLink
              direction="prev"
              content={{
                enabled: true,
                href: section.prev.path,
                label: section.prev.title,
              }}
            />
      }
      {
        section.next === null
          ? <span />
          : <StepLink
              direction="next"
              content={{
                enabled: true,
                href: section.next.path,
                label: section.next.title,
              }}
            />
      }
    </div>
  )

  return (
    <div className="container">
      <Breadcrumbs crumbs={section.crumbs.slice(0, -1)} />
      <LessonBanner lesson={lesson} />
      <ArticleContent navItems={navItems} activeNavKey={section.name} foot={links}>
        <SectionContent section={section} />
      </ArticleContent>
    </div>
  );
};

export default LessonPage;
