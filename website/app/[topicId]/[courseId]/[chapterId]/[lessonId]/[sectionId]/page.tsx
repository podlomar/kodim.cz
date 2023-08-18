import { cms } from 'lib/cms';
import Link from 'next/link';
import LessonBanner from 'components/LessonBanner';
import { LessonContentType } from 'kodim-cms/esm/content/lesson';
import { SectionContentType } from 'kodim-cms/esm/content/section';
import styles from './styles.module.scss';
import SectionContent from 'components/SectionContent';
import clsx from 'clsx';
import ArticleContent from 'components/ArticleContent/intex';
import { MenuItem } from 'components/Menu';

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
  const lessonCursor = cms.rootCursor().navigate(topicId, courseId, chapterId, lessonId);
  const lesson = await cms.loadContent(lessonCursor, LessonContentType);

  if (lesson === null) {
    return <div>Failed to load lesson</div>;
  }

  const sectionCursor = lessonCursor.navigate(sectionId);
  const section = await cms.loadContent(sectionCursor, SectionContentType);

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
      </ArticleContent>
    </div>
  );
};

export default LessonPage;
