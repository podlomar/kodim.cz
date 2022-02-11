import { Division } from 'kodim-cms/esm/content/content';
import { CourseRef } from 'kodim-cms/esm/content/course';
import CourseCard from '../CourseCard';
import './styles.scss';

interface Props {
  segment: Division<CourseRef>;
}

const DivisionView = ({ segment }: Props) => {
  return (
    <div className="division">
      <h2 className="division__title">{segment.title}</h2>
      <p className="division__lead">
        {segment.lead}
      </p>

      <div className="division__courses">
        {segment.courses.map((courseRef, idx) => (
          <CourseCard key={idx} courseRef={courseRef} />
        ))}
      </div>
    </div>
  )
}

export default DivisionView;