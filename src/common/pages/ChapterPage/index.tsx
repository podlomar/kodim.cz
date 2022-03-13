import { useParams } from 'react-router';
import { ServerAppContext, useData } from '../../AppContext';
import ChapterView from '../../ChapterView';
import Layout from '../../Layout';
import Navbar from '../../Navbar';
import NotFoundPage from '../NotFoundPage';

const fetchChapter = async (
  { cms, accessCheck }: ServerAppContext,
  courseLink: string,
  chapterLink: string,
) => cms.getRoot(accessCheck)
  .find(courseLink)
  .find(chapterLink).fetch();

const ChapterPage = () => {
  const params = useParams();
  const chapter = useData(
    ['root', params.courseLink!, params.chapterLink!],
    (serverContext: ServerAppContext) => fetchChapter(
      serverContext,
      params.courseLink!,
      params.chapterLink!,
    ),
  );

  if (chapter.status === 'not-found') {
    return <NotFoundPage />;
  }

  return (
    <Layout>
      <Navbar crumbs={chapter.crumbs} showBrand />
      <section className="container chapters-section">
        <ChapterView chapterLink={chapter.link} />
      </section>
    </Layout>
  );
};

export default ChapterPage;
