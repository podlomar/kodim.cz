import React from "react"
import Link from "next/link";
import { CourseNavItem } from "kodim-cms/esm/content/course";
import styles from "./styles.module.scss";
import Icon from "app/components/Icon";

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
        <img
          src={course.image ?? '/img/course.svg'}
          alt="Course icon"
          className={styles.icon}
        />
        <h2 className={styles.title}>{course.title}</h2>
      </div>
      <div className={styles.body}>
        <div>
          {course.lead}
        </div>
        { course.organization === 'czechitas' && (
          <div className={styles.company}>
            <Icon name="czechitas" size="1.5rem" />
            <span>Czechitas kurz</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CourseCard;
