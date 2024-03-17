import { cache } from 'react';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next'
import { openGraph } from 'app/open-graph';
import { cms } from 'lib/cms';
import Breadcrumbs from 'app/components/Breadcrumbs';
import ChapterOverview from 'app/components/ChapterOverview';
import Menu from 'app/components/Menu';
import { Course } from 'kodim-cms/esm/content/course';
import styles from './styles.module.scss';
import { session } from 'app/session';
import { CmsAgent } from 'kodim-cms/esm/access-control/claim-agent';
import ReactHast from 'app/components/ReactHast';
import CzechitasInfo from 'app/components/CzechitasInfo';

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    topicId: string;
    courseId: string;
    chapterId: string;
  }
}

const getCourse = cache(
  async (agent: CmsAgent, topicId: string, courseId: string): Promise<Course | null> => (
    cms().loadCourse(agent, topicId, courseId)
  )
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topicId, courseId } = params;
  const { cmsAgent } = await session();
  const course = await getCourse(cmsAgent, topicId, courseId);
 
  if (course === null) {
    notFound();
  }

  return {
    title: course.title,
    description: course.lead,
    openGraph: {
      ...openGraph,
      type: 'article',
      title: course.title,
      description: course.lead,
      url: course.path,
    },
  }
}

const ChapterPage = async ({ params }: Props): Promise<JSX.Element> => {
  const { topicId, courseId, chapterId } = params;
  const { cmsAgent } = await session();
  const course = await getCourse(cmsAgent, topicId, courseId);
  if (course === null) {
    notFound();
  }

  const chapter = await cms().loadChapter(cmsAgent, topicId, courseId, chapterId);
  if (chapter === null) {
    notFound();
  }

  return (
    <div className="container">
      <Breadcrumbs crumbs={course.crumbs} />
      <div 
        className={styles.courseBanner}
        style={{ backgroundImage: `url(/img/${course.topic}-mask.svg)` }}
      >
        <img
          src={course.image ?? '/img/course.svg'}
          alt="Course icon"
          className={styles.icon}
        />
        <div className={styles.intro}>
          <h1 className={styles.title}>{course.title}</h1>
          <p className={styles.lead}>{course.lead}</p>
        </div>
      </div>
      {course.organization === 'czechitas' && (
        <CzechitasInfo course outboundLink={course.outboundLink} />
      )}
      <div className={styles.courseInfo}>
        { course.intro !== null && (
          course.intro.items.map((item) => (
            <div className={styles.courseInfoItem}>
              <ReactHast root={item} />
            </div>
          ))
        )}
        { course.organization === 'kodim' && (
          <div className={styles.courseInfoItem}>
            <a 
              href={`/odber?topic=${course.title}`}
              className="btnBig"
            >
              Mám zájem o tento kurz
            </a>
          </div>
        )}
      </div>
      { chapter.name === 'lekce' && course.intro !== null && course.intro.items.length > 0 && (
        <h2 className={styles.lessonsHeading}>Lekce</h2>
      )}
      {
        chapter.name === 'lekce'
          ? (
            <ChapterOverview lessons={chapter.lessons} />
          ) : (
            <>
              <Menu
                items={course.chapters.map((chapter) => ({
                  label: chapter.title,
                  href: chapter.path,
                  key: chapter.name,
                }))}
                activeKey={chapter.name}
              />
              <ChapterOverview
                key={chapter.name}
                title={chapter.title}
                lead={chapter.lead}
                lessons={chapter.lessons}
              />
            </>
          )
      }
    </div>
  );
};

export default ChapterPage
