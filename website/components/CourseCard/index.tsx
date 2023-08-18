import React from "react"
import Link from "next/link";
import { ShallowCourse } from "kodim-cms/esm/content/course";
import styles from "./styles.module.scss";

interface Props {
  course: ShallowCourse,
}

const CourseCard = ({ course }: Props): JSX.Element => {
  return (
    <div className={styles.courseCard}>
      <Link 
        href={course.path}
        className={styles.banner}
        style={{ backgroundImage: `url(${course.topicMask})` }}
      >
        <img src={course.image} alt="Course icon" className={styles.icon} />        
        <h2 className={styles.title}>{course.title}</h2>
      </Link>
      <div className={styles.body}>{course.lead}</div>
    </div>
  );
};

export default CourseCard;
