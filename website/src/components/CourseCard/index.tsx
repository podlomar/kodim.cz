import React from "react"
import Link from "next/link";
import { CourseNavItem } from "kodim-cms/esm/content/course";
import styles from "./styles.module.scss";
import Icon from "components/Icon";

interface Props {
  course: CourseNavItem,
}

const CourseCard = ({ course }: Props): JSX.Element => {
  return (
    <Link href={course.path} className={styles.courseCard}>
      <div 
        className={styles.banner}
        style={{ backgroundImage: `url(/img/${course.topic}-mask.svg)` }}
      >
        <img src={course.image} alt="Course icon" className={styles.icon} />        
        <h2 className={styles.title}>{course.title}</h2>
      </div>
      <div className={styles.body}>
        <div>
          {course.lead}
        </div>
        { course.org === 'czechitas' && (
          <div className={styles.company}>
            <Icon type="czechitas" size="1.5rem" />
            <span>Pouze pro účastníky Czechitas</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CourseCard;
