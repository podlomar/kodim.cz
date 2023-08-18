import { cms } from 'lib/cms';
import { CourseContentType } from 'kodim-cms/esm/content/course';
import ChapterOverview from 'components/ChapterOverview';
import Menu from 'components/Menu';
import styles from './styles.module.scss';
import { ChapterContentType } from 'kodim-cms/esm/content/chapter';

interface Props {
  params: {
    topicId: string;
    courseId: string;
    chapterId: string;
  }
}

const ChapterPage = async ({ params }: Props): Promise<JSX.Element> => {
  const { topicId, courseId, chapterId } = params;
  const courseCursor = cms.rootCursor().navigate(topicId, courseId);

  if (!courseCursor.isOk) {
    return <div>Failed to load content</div>;
  }

  const course = await cms.loadContent(courseCursor, CourseContentType);
  if (course === null) {
    return <div>Failed to load content</div>;
  }

  const chapterCursor = courseCursor.navigate(chapterId);
  if (!chapterCursor.isOk) {
    return <div>Failed to load content</div>;
  }

  const chapter = await cms.loadContent(chapterCursor, ChapterContentType);
  if (chapter === null) {
    return <div>Failed to load content</div>;
  }

  return (
    <div className="container">
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

  // const lesson = course.lessons.find((chapter) => chapter.name === segment1);

  // const section = sectionCursor.entry();
  
  // if (section === null) {
  //   return <div>Failed to load content</div>;
  // }

  // redirect(`${segment1}/${section.name}`);
};

export default ChapterPage
