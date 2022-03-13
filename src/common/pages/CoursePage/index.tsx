import { useParams } from 'react-router';
import Layout from '../../Layout';
import ChapterView from '../../ChapterView';
import Navbar from '../../Navbar';
import CourseBanner from '../../CourseBanner';
import { ServerAppContext, useData } from '../../AppContext';
import './styles.scss';
import NotFoundPage from '../NotFoundPage';

const fetchCourse = async (
  { cms, accessCheck }: ServerAppContext,
  courseLink: string,
) => cms.getRoot(accessCheck).find(courseLink).fetch();

const CoursePage = () => {
  const courseLink = useParams().courseLink!;

  const course = useData(
    ['root', courseLink],
    (serverContext: ServerAppContext) => fetchCourse(serverContext, courseLink),
  );

  if (course.status === 'not-found') {
    return <NotFoundPage />;
  }

  let mainSection = null;

  if (course.status === 'forbidden') {
    mainSection = <h2>K tomuto kurzu nemáte přistup</h2>;
  } else if (course.content.type !== 'broken') {
    mainSection = course.content.chapters.map((chapter) => (
      <ChapterView key={chapter.link} chapterLink={chapter.link} />
    ));
  }

  return (
    <Layout>
      <Navbar crumbs={course.crumbs} showBrand />
      <CourseBanner course={course} />

      <section className="container chapters-section">
        {mainSection}
      </section>
    </Layout>
  );
};

export default CoursePage;
