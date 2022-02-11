import EntryLink from '../EntryLink';
import { CourseRef } from 'kodim-cms/esm/content/course';
import './styles.scss';

interface Props {
  courseRef: CourseRef;
}

const CourseCard = ({ courseRef }: Props) => {
  return (
    <div className="course-card">
      <img
        className="course-card__image"
        src={courseRef.publicContent === 'broken'
          ? '/assets/broken-course.svg'
          : courseRef.publicContent.image}
      />
      <h3>{courseRef.title}</h3>
      <p className="course-card__lead">
        {courseRef.publicContent === 'broken'
          ? 'Chyba ve formátu kurzu'
          : courseRef.publicContent.lead
        }
      </p>

      <p className="course-card__controls">
        <EntryLink className="btn" entryRef={courseRef} text="Přejít na kurz" />
      </p>
    </div>
  )
}

export default CourseCard;