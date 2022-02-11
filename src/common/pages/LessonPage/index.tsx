import EntryLink from "../../EntryLink";
import Navbar from "../../Navbar";
import ArticleContent from "../../ArticleContent";
import LessonSectionView from "../../LessonSectionView";
import Layout from "../../Layout";
import { ServerAppContext, useData } from "../../AppContext";
import { useParams } from "react-router";
import SideNavLink from "../../SideNavLink";
import LessonBanner from "../LessonBanner";
import './styles.scss';

const fetchLesson = async (
  { cms, accessCheck }: ServerAppContext,
  courseLink: string,
  chapterLink: string,
  lessonLink: string,
) => cms.getRoot(accessCheck)
  .find(courseLink)
  .find(chapterLink)
  .find(lessonLink)
  .fetch();

const LessonPage = () => {
  const params = useParams();
  const lesson = useData(
    ['root', params.courseLink!, params.chapterLink!, params.lessonLink!],
    (serverContext: ServerAppContext) => fetchLesson(
      serverContext,
      params.courseLink!,
      params.chapterLink!,
      params.lessonLink!,
    ),
  );

  if (lesson.status === 'not-found') {
    return <h1>Not found</h1>;
  }

  if (lesson.status === 'forbidden') {
    return <h1>Forbidden</h1>;
  }

  if (lesson.content.type === 'broken') {
    return <p>Špatný formát lekce</p>;
  }

  const activeSectionLink = params.sectionLink ?? lesson.content.sections[0].link;

  const articleNavigation = lesson.content.sections.map((secRef) => (
    <SideNavLink key={secRef.link} active={secRef.link === activeSectionLink}>
      <EntryLink entryRef={secRef} text={secRef.title} />
    </SideNavLink>
  ));

  return (
    <Layout>
      <Navbar crumbs={lesson.crumbs} showBrand />
      <LessonBanner lesson={lesson} />
      <ArticleContent navElement={articleNavigation}>
        <LessonSectionView sectionLink={activeSectionLink} />
      </ArticleContent>
    </Layout>
  );
};

export default LessonPage;
