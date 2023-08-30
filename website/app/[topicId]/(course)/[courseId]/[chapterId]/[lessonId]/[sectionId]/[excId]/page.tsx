import { cms } from 'lib/cms';
import { MenuItem } from 'components/Menu';
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

const ExercisePage = async ({ params }: Props): Promise<JSX.Element> => {
  const { topicId, courseId, chapterId, lessonId, sectionId, excId } = params;
  const lesson = await cms.loadLesson(topicId, courseId, chapterId, lessonId);
  const exercise = await cms.loadExercise(
    topicId, courseId, chapterId, lessonId, sectionId, excId
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
