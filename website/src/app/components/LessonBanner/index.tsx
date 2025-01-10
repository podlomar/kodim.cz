import React from "react"
import { Lesson } from "kodim-cms/esm/content/lesson";
import styles from "./styles.module.scss";
import StepLink from "app/components/StepLink";

interface Props {
  lesson: Lesson,
}

const LessonBanner = ({ lesson }: Props): JSX.Element => {
  return (
    <div className={styles.lessonBanner}>
      <div className={styles.bannerBody}>
        <div className={styles.lessonNum}>{lesson.num}</div>
        <div className={styles.lessonIntro}>
          <h1 className={styles.lessonTitle}>{lesson.title}</h1>
          <p className={styles.lessonLead}>{lesson.lead}</p>
        </div>
      </div>
    </div>
  );
};

export default LessonBanner;
