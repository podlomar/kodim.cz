import { useParams } from 'react-router';
import EntryLink from '../../EntryLink';
import Navbar from '../../Navbar';
import ArticleContent from '../../ArticleContent';
import LessonSectionView from '../../LessonSectionView';
import Layout from '../../Layout';
import { ServerAppContext, useData } from '../../AppContext';
import SideNavLink from '../../SideNavLink';
import LessonBanner from '../LessonBanner';
import './styles.scss';
import NotFoundPage from '../NotFoundPage';
import ForbiddenPage from '../ForbiddenPage';
import Restricted from '../../Restricted';

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
    (serverContext: ServerAppContext) => fetchLesson(
      serverContext,
      params.courseLink!,
      params.chapterLink!,
      params.lessonLink!,
    ),
  );

  if (lesson.status === 'not-found') {
    return <NotFoundPage />;
  }

  if (lesson.status === 'forbidden') {
    return <ForbiddenPage />;
  }

  if (lesson.content.type === 'broken') {
    return <p>Špatný formát lekce</p>;
  }

  const activeSectionLink = params.sectionLink ?? lesson.content.sections[0]?.link;

  const articleNavigation = lesson.content.sections.map((secRef) => (
    <SideNavLink key={secRef.link} active={secRef.link === activeSectionLink}>
      <EntryLink
        path={secRef.path}
        text={secRef.title}
        forbidden={secRef.status === 'forbidden'}
      />
    </SideNavLink>
  ));

  return (
    <Layout>
      <Navbar crumbs={lesson.crumbs} showBrand />
      <LessonBanner lesson={lesson} />
      <ArticleContent navElement={articleNavigation}>
        { activeSectionLink === undefined ? (
          <p><strong>CHYBA: Tato lekce neobsahuje odkazy na žádné sekce!</strong></p>
        ) : <LessonSectionView sectionLink={activeSectionLink} />}
      </ArticleContent>
      <Restricted claim="lessonManagement">
        <div className="container management">
          <p>
            Pokud vidíš tento panel, máš práva ke správě lekcí v tomto běhu kurzu.
            Zatím se tu nedá nic provést, ale to se časem změní a tvá moc naroste.
          </p>
        </div>
      </Restricted>
    </Layout>
  );
};

export default LessonPage;
