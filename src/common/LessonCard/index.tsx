import { LessonRef } from 'kodim-cms/esm/content/lesson';
import EntryLink from '../EntryLink';
import Num from '../Num';
import './styles.scss';

interface Props {
  lessonRef: LessonRef;
}

const LessonCard = ({ lessonRef }: Props) => {
  return (
    <div className="lesson-card">
      <Num value={lessonRef.publicContent === 'broken' ? -1 : lessonRef.publicContent.num} />
      <h3>{lessonRef.title}</h3>
      <p className="lesson-card__lead">
        {lessonRef.publicContent === 'broken'
          ? 'Chyba ve formátu lekce'
          : lessonRef.publicContent.lead}
      </p>

      <div className="lesson-card__controls">
        <EntryLink
          className="btn"
          path={lessonRef.path}
          text="Přejít na lekci"
          forbidden={lessonRef.status === 'forbidden'}
        />
      </div>
    </div>
  );
};

export default LessonCard;
