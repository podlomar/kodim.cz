import { CourseRef } from 'kodim-cms/esm/content/course';
import EntryLink from '../EntryLink';
import './styles.scss';

interface Props {
  courseRef: CourseRef;
}

const CourseCard = ({ courseRef }: Props) => {
  const isForbidden = courseRef.path === 'forbidden';

  return (
    <div className="course-card">
      <img
        className="course-card__image"
        src={courseRef.publicContent === 'broken'
          ? '/assets/broken-course.svg'
          : courseRef.publicContent.image}
        alt={courseRef.title}
      />
      <h3>{courseRef.title}</h3>
      <p className="course-card__lead">
        {courseRef.publicContent === 'broken'
          ? 'Chyba ve formátu kurzu'
          : courseRef.publicContent.lead}
      </p>

      <p className="course-card__controls">
        <EntryLink
          path={courseRef.path}
          text={isForbidden ? 'Kurz zamčen' : 'Přejít na kurz'}
          forbidden={isForbidden}
        />
      </p>
    </div>
  );
};

export default CourseCard;
