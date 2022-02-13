import { useParams } from 'react-router';
import Navbar from '../../Navbar';
import Layout from '../../Layout';
import { ServerAppContext, useData } from '../../AppContext';
import JsmlContainer from '../../JsmlContainer';
import ArticleContent from '../../ArticleContent';
import SideNavLink from '../../SideNavLink';
import './styles.scss';

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
    ['root', params.courseLink!, params.chapterLink!, params.lessonLink!, params.excLink!],
    (serverContext: ServerAppContext) => fetchExercise(
      serverContext,
      params.courseLink!,
      params.chapterLink!,
      params.lessonLink!,
      params.sectionLink!,
      params.excLink!,
    ),
  );

  if (exercise.status === 'not-found') {
    return <h1>Not found</h1>;
  }

  if (exercise.status === 'forbidden') {
    return <h1>Forbidden</h1>;
  }

  return (
    <Layout>
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
                <h2 id="zadani">Zadání</h2>
                <JsmlContainer jsml={exercise.content.assignJsml} />
                <h2 id="reseni">Řešení</h2>
                <JsmlContainer jsml={exercise.content.solutionJsml} />
              </>
            )
        }
      </ArticleContent>
    </Layout>
  );
};

export default ExercisePage;
