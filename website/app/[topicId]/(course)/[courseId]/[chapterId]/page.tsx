import { cache } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next'
import { cms } from 'lib/cms';
import { pageTitle } from 'lib/page-title';
import Breadcrumbs from 'components/Breadcrumbs';
import ChapterOverview from 'components/ChapterOverview';
import Menu from 'components/Menu';
import { Course } from 'kodim-cms/esm/content/course';
import styles from './styles.module.scss';

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    topicId: string;
    courseId: string;
    chapterId: string;
  }
}

const getCourse = cache(
  async (topicId: string, courseId: string): Promise<Course | null> => (
    cms.loadCourse(topicId, courseId)
  )
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topicId, courseId } = params;
  const course = await getCourse(topicId, courseId);
 
  if (course === null) {
    notFound();
  }

  return {
    title: pageTitle(course.title),
    description: course.lead,
    openGraph: {
      title: pageTitle(course.title),
      description: course.lead,
      type: 'article',
    },
  }
}

const ChapterPage = async ({ params }: Props): Promise<JSX.Element> => {
  const { topicId, courseId, chapterId } = params;
  const course = await getCourse(topicId, courseId);
  if (course === null) {
    notFound();
  }

  const chapter = await cms.loadChapter(topicId, courseId, chapterId);
  if (chapter === null) {
    notFound();
  }

  return (
    <div className="container">
      <Breadcrumbs crumbs={course.crumbs} />
      <div 
        className={styles.courseBanner}
        style={{ backgroundImage: `url(${course.topicMask})` }}
      >
        <img
          className={styles.icon}
          src={course.image}
          alt="Course icon"
        />
        <div className={styles.intro}>
          <h1 className={styles.title}>{course.title}</h1>
          <p className={styles.lead}>{course.lead}</p>
        </div>
      </div>
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
