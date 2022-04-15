import { useParams } from 'react-router';
import { Helmet } from 'react-helmet';
import { useMemo } from 'react';
import Navbar from '../../Navbar';
import Layout from '../../Layout';
import { ServerAppContext, useData } from '../../AppContext';
import JsmlContainer from '../../JsmlContainer';
import ArticleContent from '../../ArticleContent';
import SideNavLink from '../../SideNavLink';
import './styles.scss';
import NotFoundPage from '../NotFoundPage';
import ForbiddenPage from '../ForbiddenPage';
import ExerciseView from '../../ExerciseView';
import Restricted from '../../Restricted';
import EditPageButton from '../../EditPageButton';

const fetchExercise = async (
  { cms, accessCheck }: ServerAppContext,
  courseLink: string,
  chapterLink: string,
  lessonLink: string,
  sectionLink: string,
  excLink: string,
) => cms.getRoot(accessCheck)
  .find(courseLink)
  .find(chapterLink)
  .find(lessonLink)
  .find(sectionLink)
  .find(excLink)
  .fetch();

const ExercisePage = () => {
  const params = useParams();
  const exercise = useData(
    (serverContext: ServerAppContext) => fetchExercise(
      serverContext,
      params.courseLink!,
      params.chapterLink!,
      params.lessonLink!,
      params.sectionLink!,
      params.excLink!,
    ),
  );

  const editPagePath = useMemo(
    () => `${params.chapterLink}/${params.lessonLink}/${params.excLink?.replace('>', '/')}.md`,
    [params],
  );

  if (exercise.status === 'not-found') {
    return <NotFoundPage />;
  }

  if (exercise.status === 'forbidden') {
    return <ForbiddenPage />;
  }

  return (
    <Layout>
      <Helmet>
        <title>{exercise.title}</title>
      </Helmet>
      <Navbar crumbs={exercise.crumbs} showBrand />
      <div className="stripe">
        <div className="container exercise-banner">
          <h1 className="exercise-banner__title">{exercise.title}</h1>
        </div>
      </div>
      <ArticleContent
        navElement={(
          <>
            <SideNavLink>
              <a href="#zadani">Zadání</a>
            </SideNavLink>
            <SideNavLink>
              <a href="#reseni">Řešení</a>
            </SideNavLink>
          </>
        )}
      >
        {
          exercise.content.type === 'broken'
            ? <p>Špatný formát cvičení</p>
            : (
              <>
                <h2>Zadání</h2>
                <ExerciseView
                  demand={exercise.content.demand}
                  num={exercise.content.num}
                  title={exercise.title}
                  hasSolution={false}
                  jsml={exercise.content.assignJsml}
                  link="zadani"
                />
                <h2 id="reseni">Řešení</h2>
                <JsmlContainer jsml={exercise.content.solutionJsml} />
              </>
            )
        }
      </ArticleContent>
      <Restricted claim="lessonManagement">
        <div className="container management">
          <EditPageButton mode="edit" path={editPagePath} />
        </div>
      </Restricted>
    </Layout>
  );
};

export default ExercisePage;
