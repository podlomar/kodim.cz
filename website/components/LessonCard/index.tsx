import React from "react"
import Link from "next/link";
import { ShallowLesson } from "kodim-cms/esm/content/lesson";
import styles from "./styles.module.scss";

interface Props {
  lesson: ShallowLesson,
}

const LessonCard = ({ lesson }: Props): JSX.Element => {
  return (
    <div className={styles.lessonCard}>
      <div>
        <div className={styles.num}>{lesson.num}</div>
      </div>
      <div className={styles.main}>
        <Link href={lesson.path} className={styles.title}>
          <h2>{lesson.title}</h2>
        </Link>
        <div className={styles.lead}>{lesson.lead}</div>
      </div>
    </div>
  );
};

export default LessonCard;
