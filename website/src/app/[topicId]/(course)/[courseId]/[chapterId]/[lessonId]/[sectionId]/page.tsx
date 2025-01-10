import { cache } from 'react';
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
// import { CmsAgent } from 'kodim-cms/esm/access-control/claim-agent';
import MainLayout from 'app/components/MainLayout';
import ArticleNavigation from 'app/components/ArticleNavigation';
import ArticleContent from 'app/components/ArticleContent/intex';
import StepLink from 'app/components/StepLink';
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
    // cmsAgent: CmsAgent,
    topicId: string,
    courseId: string,
    chapterId: string,
    lessonId: string,
  ): Promise<Lesson | 'not-found'> => (
    cms().loadLesson(`/${topicId}/${courseId}/${chapterId}/${lessonId}`)
  )
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topicId, courseId, chapterId, lessonId } = params;
  const { cmsAgent } = await session();
  const lesson = await getLesson(topicId, courseId, chapterId, lessonId);
 
  if (lesson === 'not-found') {
    notFound();
  }

  // if (lesson.locked) {
  //   notFound();
  // }

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

const LessonPage = async ({ params }: Props): Promise<JSX.Element> => {
  const { topicId, courseId, chapterId, lessonId, sectionId } = params;
  const { cmsAgent } = await session();
  const lesson = await getLesson(topicId, courseId, chapterId, lessonId);
  if (lesson === 'not-found') {
    notFound();
  }

  const section = await cms().loadSection(
    `/${topicId}/${courseId}/${chapterId}/${lessonId}/${sectionId}`
  );

  if (section === 'not-found') {
    notFound();
  }

  const navItems = lesson.sections.map((sec): MenuItem => ({
    href: sec.path,
    key: sec.name,
    label: sec.title,
  }));

  return (
    <MainLayout
      left={
        <ArticleNavigation
          navItems={navItems}
          activeNavKey={section.name}
          next={section.next?.path ?? null}
          prev={section.prev?.path ?? null}
        />
      }
      header={<Breadcrumbs crumbs={section.crumbs.slice(0, -1)} />}
      right={
        <div className={styles.bannerLinks}>
          <StepLink 
            direction="prev-responsive"
            content={lesson.prev === null
              ? {
                status: 'disabled',
                text: <div>Nemá předchozí <br /> lekci</div>,
              }
              : lesson.prev.locked
                ? {
                  status: 'locked',
                  label: lesson.prev.title,
                }
                : {
                  status: 'enabled',
                  href: lesson.prev.path,
                  label: lesson.prev.title,
                }
            }
          />
          <StepLink 
            direction="next"
            content={lesson.next === null
              ? {
                status: 'disabled',
                text: <div>Nemá následující <br /> lekci</div>,
              }
              : lesson.next.locked
                ? {
                  status: 'locked',
                  label: lesson.next.title,
                }
                : {
                  status: 'enabled',
                  href: lesson.next.path,
                  label: lesson.next.title,
                }
            }
          />
        </div>
      }
      showBrand
    >
      <LessonBanner lesson={lesson} />
      <ArticleContent>
        <SectionContent section={section} />
      </ArticleContent>
    </MainLayout>
  );
};

export default LessonPage;
