import { useParams } from 'react-router-dom';
import { ServerAppContext, useData } from '../AppContext';
import LessonCard from '../LessonCard';
import './styles.scss';

interface Props {
  chapterLink: string;
}

const fetchChapter = async (
  { cms, accessCheck }: ServerAppContext,
  courseLink: string,
  chapterLink: string,
) => cms
  .getRoot(accessCheck)
  .find(courseLink)
  .find(chapterLink)
  .fetch();

const ChapterView = ({ chapterLink }: Props) => {
  const courseLink = useParams().courseLink!;

  const chapter = useData(
    ['root', courseLink, chapterLink],
    (serverContext: ServerAppContext) => fetchChapter(serverContext, courseLink, chapterLink),
  );

  if (chapter.status === 'not-found') {
    return <div className="failed">NOT FOUND</div>;
  }

  if (chapter.status === 'forbidden') {
    return <div className="failed">FORBIDDEN!</div>;
  }

  return (
    <div id={chapter.link} className="chapter">
      <h2>{chapter.title}</h2>
      <p className="chapter__lead">
        {chapter.content.type === 'broken'
          ? 'Chyba ve formátu kapitoly'
          : chapter.content.lead}
      </p>

      <div className="chapter__lessons">
        {chapter.content.type === 'broken'
          ? null
          : chapter.content.lessons.map((lessonRef) => (
            <LessonCard key={lessonRef.link} lessonRef={lessonRef} />))}
      </div>
    </div>
  );
};

export default ChapterView;
