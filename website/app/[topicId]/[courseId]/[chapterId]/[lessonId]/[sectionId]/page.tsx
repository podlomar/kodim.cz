import { cms } from 'lib/cms';
import Link from 'next/link';
import LessonBanner from 'components/LessonBanner';
import styles from './styles.module.scss';
import SectionContent from 'components/SectionContent';
import ArticleContent from 'components/ArticleContent/intex';
import { MenuItem } from 'components/Menu';

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

  return (
    <div className="container">
      <LessonBanner lesson={lesson} />
      <ArticleContent navItems={navItems} activeNavKey={section.name}>
        <SectionContent section={section} />
        <div className={styles.links}>
          { section.prev === null ? <span /> : <Link href={section.prev.path}>&lt; Předchozí</Link> }
          { section.next === null ? <span /> : <Link href={section.next.path}>Následujicí &gt;</Link> }
        </div>
        </div>
      </ArticleContent>
    </div>
  );
};

export default LessonPage;
