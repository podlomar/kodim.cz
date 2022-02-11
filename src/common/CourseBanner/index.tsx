import { CourseResource } from 'kodim-cms/esm/content/course.js';
import './styles.scss'

interface Props {
  course: CourseResource
}

const CourseBanner = ({ course }: Props) => {
  return (
    <div className="stripe">
      <div className="container course-banner">
        <div className="course-banner__intro">
          <h1 className="course-banner__title">{course.title}</h1>
          {
            course.content.type === 'broken'
              ? <p>Chyba ve formátu kurzu</p>
              : <p>{course.content.lead}</p>
          }
        </div>
        <img
          className="course-banner__image"
          src={course.content.type === 'broken'
            ? undefined
            : course.content.image
          }
        />
      </div>
    </div>
  )
}

export default CourseBanner;