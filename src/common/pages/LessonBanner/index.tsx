import { LessonResource } from 'kodim-cms/esm/content/lesson';
import SiblingLink from '../../SiblingLink';
import './styles.scss';

interface Props {
  lesson: LessonResource;
}

const LessonBanner = ({ lesson }: Props) => {
  if (lesson.status === 'forbidden') {
    return <h1>Forbidden</h1>;
  }

  if (lesson.content.type === 'broken') {
    return <p>Špatný formát lekce</p>;
  }

  return (
    <div className="stripe">
      <div className="container lesson-banner">
        <div className="lesson-banner__navlinks">
          {lesson.content.prev === null ? <div /> : (
            <SiblingLink
              entryRef={lesson.content.prev}
              direction="backward"
              label="předchozí lekce"
              text={lesson.content.prev.title}
              iconColor="white"
            />
          )}
          {lesson.content.next === null ? <div /> : (
            <SiblingLink
              entryRef={lesson.content.next}
              direction="forward"
              label="následující lekce"
              text={lesson.content.next.title}
              iconColor="white"
            />
          )}
        </div>
        <h1 className="lesson-banner__title">{lesson.title}</h1>
        <p className="lesson-banner__lead">{lesson.content.lead}</p>
      </div>
    </div>
  );
};

export default LessonBanner;
