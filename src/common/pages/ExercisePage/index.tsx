import { useParams } from 'react-router';
import { Helmet } from 'react-helmet';
import Navbar from '../../Navbar';
import Layout from '../../Layout';
import { ServerContextValue, useData } from '../../AppContext';
import JsmlContainer from '../../JsmlContainer';
import ArticleContent from '../../ArticleContent';
import SideNavLink from '../../SideNavLink';
import NotFoundPage from '../NotFoundPage';
import ForbiddenPage from '../ForbiddenPage';
import ExerciseView from '../../ExerciseView';
import Restricted from '../../Restricted';
import EditPageButton from '../../EditPageButton';
import './styles.scss';

const fetchExercise = async (
  { cms, accessCheck }: ServerContextValue,
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
    (serverContext: ServerContextValue) => fetchExercise(
      serverContext,
      params.courseLink!,
      params.chapterLink!,
      params.lessonLink!,
      params.sectionLink!,
      params.excLink!,
    ),
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
        <Restricted claim="lessonManagement">
          <div className="content-controls">
            <EditPageButton
              repo={exercise.repository}
              extension=".md"
              mode="edit"
            />
          </div>
        </Restricted>
      </ArticleContent>
    </Layout>
  );
};

export default ExercisePage;
