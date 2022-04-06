import { useParams } from 'react-router';
import { Helmet } from 'react-helmet';
import Layout from '../../Layout';
import ChapterView from '../../ChapterView';
import Navbar from '../../Navbar';
import CourseBanner from '../../CourseBanner';
import { ServerAppContext, useData } from '../../AppContext';
import './styles.scss';
import NotFoundPage from '../NotFoundPage';
import ForbiddenPage from '../ForbiddenPage';

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

  if (course.status === 'forbidden') {
    return <ForbiddenPage />;
  }

  if (course.content.type === 'broken') {
    return <p>Broken</p>;
  }

  return (
    <Layout>
      <Helmet>
        <title>{course.title}</title>
        <meta
          name="description"
          content={course.content.lead}
        />
      </Helmet>
      <Navbar crumbs={course.crumbs} showBrand />
      <CourseBanner course={course} />

      <section className="container chapters-section">
        {course.content.chapters.map((chapter) => (
          <ChapterView key={chapter.link} chapterLink={chapter.link} />
        ))}
      </section>
    </Layout>
  );
};

export default CoursePage;
