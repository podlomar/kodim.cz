import { cms } from 'lib/cms';
import { MenuItem } from 'components/Menu';
import { LessonContentType } from 'kodim-cms/esm/content/lesson';
import { ExerciseContentType } from 'kodim-cms/esm/content/exercise';
import LessonBanner from 'components/LessonBanner';
import ReactHast from 'components/ReactHast';
import ArticleContent from 'components/ArticleContent/intex';
import styles from './styles.module.scss';

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

const ExercisePage = async ({ params }: Props): Promise<JSX.Element> => {
  const { topicId, courseId, chapterId, lessonId, sectionId, excId } = params;
  const lesson = await cms.loadContent(
    cms.rootCursor().navigate(topicId, courseId, chapterId, lessonId),
    LessonContentType
  );

  const exercise = await cms.loadContent(
    cms.rootCursor().navigate(topicId, courseId, chapterId, lessonId, sectionId, excId),
    ExerciseContentType
  );

  if (exercise === null || lesson === null) {
    return <div>Failed to load content</div>;
  }

  const navItems = lesson.sections.map((sec): MenuItem => ({
    href: sec.path,
    key: sec.name,
    label: sec.title,
  }));

  return (
    <div className="container">
      <LessonBanner lesson={lesson} />
      <ArticleContent navItems={navItems} activeNavKey={sectionId}>
        <div className={styles.excBanner}>
          <div className={styles.num}>{exercise.num}</div>
          <div>
            <div className={styles.title}>{exercise.title}</div>
            <p>{exercise.lead}</p>
          </div>
        </div>
        <ReactHast root={exercise.assign} />
        { exercise.solution && (
          <>
            <h2>Řešení</h2>
            <ReactHast root={exercise.solution} />
          </>
        )}
      </ArticleContent>
    </div>
  );
};

export default ExercisePage;
