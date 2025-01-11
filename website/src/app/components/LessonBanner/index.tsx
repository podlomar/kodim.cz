import React, { type JSX } from "react";
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
      <div className={styles.bannerLinks}>
        <StepLink 
          direction="prev-responsive"
          content={lesson.prev === null
            ? {
              status: 'disabled',
              text: <div>Nemá předchozí <br /> lekci</div>,
            }
            : lesson.prev.locked
              ? {
                status: 'locked',
                label: lesson.prev.title,
              }
              : {
                status: 'enabled',
                href: lesson.prev.path,
                label: lesson.prev.title,
              }
          }
        />
        <StepLink 
          direction="next"
          content={lesson.next === null
            ? {
              status: 'disabled',
              text: <div>Nemá následující <br /> lekci</div>,
            }
            : lesson.next.locked
              ? {
                status: 'locked',
                label: lesson.next.title,
              }
              : {
                status: 'enabled',
                href: lesson.next.path,
                label: lesson.next.title,
              }
          }
        />
      </div>
    </div>
  );
};

export default LessonBanner;
