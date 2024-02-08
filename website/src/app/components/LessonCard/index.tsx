import React from "react"
import Link from "next/link";
import { LessonNavItem } from "kodim-cms/esm/content/lesson";
import styles from "./styles.module.scss";
import Icon from "app/components/Icon";

interface Props {
  lesson: LessonNavItem,
}

const LessonCard = ({ lesson }: Props): JSX.Element => {
  return (
    <div className={styles.lessonCard}>
      <div>
        {lesson.locked ? (
          <div className={styles.lock}>
            <Icon name="lock" size="1.2rem" />
          </div>
        ) : (
          <div className={styles.num}>
            {lesson.num}
          </div>
        )}
      </div>
      <div className={styles.main}>
        {lesson.locked ? (
          <h2 className={styles.title}>{lesson.title}</h2>
        ) : (
          <Link href={lesson.path} className={styles.titleLink}>
            <h2 className={styles.title}>{lesson.title}</h2>
          </Link>
        )}
        <div className={styles.lead}>{lesson.lead}</div>
      </div>
    </div>
  );
};

export default LessonCard;
