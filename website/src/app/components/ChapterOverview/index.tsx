import React, { type JSX } from "react";
import LessonCard from "app/components/LessonCard";
import { LessonNavItem } from "kodim-cms/esm/content/lesson";
import styles from "./styles.module.scss";

interface Props {
  title?: string;
  lead?: string;
  lessons: LessonNavItem[];
}

const ChapterOverview = ({ title, lead, lessons }: Props): JSX.Element => {
  return (
    <div className={styles.chapterOverview}>
      { title !== undefined && <h2 className={styles.title}>{title}</h2> }
      { lead !== undefined && <p className={styles.lead}>{lead}</p> }
      <div className={styles.lessons}>
        {
          lessons.map((lesson) => (
            <LessonCard key={lesson.name} lesson={lesson} />
          ))
        }
      </div>
    </div>
  );
};

export default ChapterOverview;
