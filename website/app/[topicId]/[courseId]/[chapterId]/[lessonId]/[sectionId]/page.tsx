import { cms } from 'lib/cms';
import LessonBanner from 'components/LessonBanner';
import styles from './styles.module.scss';
import SectionContent from 'components/SectionContent';
import ArticleContent from 'components/ArticleContent/intex';
import { MenuItem } from 'components/Menu';
import StepLink from 'components/StepLink';

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

const LessonPage = async ({ params }: Props): Promise<JSX.Element> => {
  const { topicId, courseId, chapterId, lessonId, sectionId } = params;
  const lesson = await cms.loadLesson(topicId, courseId, chapterId, lessonId);
  if (lesson === null) {
    return <div>Failed to load lesson</div>;
  }

  const section = await cms.loadSection(topicId, courseId, chapterId, lessonId, sectionId);
  if (section === null) {
    return <div>Failed to load section</div>;
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
              href={section.prev.path}
              label={section.prev.title}
            />
      }
      { 
        section.next === null
          ? <span />
          : <StepLink
              direction="next"
              href={section.next.path}
              label={section.next.title}
            />
      }
    </div>
  )

  return (
    <div className="container">
      <LessonBanner lesson={lesson} />
      <ArticleContent navItems={navItems} activeNavKey={section.name} foot={links}>
        <SectionContent section={section} />
      </ArticleContent>
    </div>
  );
};

export default LessonPage;
