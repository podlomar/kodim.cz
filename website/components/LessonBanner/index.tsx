import React from "react"
import { ShallowLesson } from "kodim-cms/esm/content/lesson";
import styles from "./styles.module.scss";

interface Props {
  lesson: ShallowLesson,
}

const LessonBanner = ({ lesson }: Props): JSX.Element => {
  return (
    <div className={styles.lessonBanner}>
      <div className={styles.lessonNum}>{lesson.num}</div>
      <div className={styles.lessonIntro}>
        <h1 className={styles.lessonTitle}>{lesson.title}</h1>
        <p className={styles.lessonLead}>{lesson.lead}</p>
      </div>
    </div>
  );
};

export default LessonBanner;
