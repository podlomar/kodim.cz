import React from "react"
import Link from "next/link";
import { CourseLink } from "kodim-cms/esm/content/course.js";
import Icon from "app/components/Icon";
import styles from "./styles.module.scss";

interface Props {
  course: CourseLink
}

const CourseCard = ({ course }: Props): JSX.Element => {
  return (
    <Link href={course.path} className={styles.courseCard}>
      <div className={styles.banner}>
        <img
          src={course.imagePath === null 
            ? '/img/course.svg'
            : `/cms/assets${course.imagePath}`
          }
          alt="Course icon"
          className={styles.icon}
        />
        <h2 className={styles.title}>{course.title}</h2>
      </div>
      <div className={styles.body}>
        <div>
          {course.lead}
        </div>
        { course.topic === 'czechitas' && (
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
