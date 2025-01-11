import React, { type JSX } from "react";
import clsx from "clsx";
import Link from "next/link";
import { ExerciseNavItem } from "kodim-cms/esm/content/exercise";
import styles from "./styles.module.scss";

interface Props {
  exercise: ExerciseNavItem,
  link: boolean,
}

const ExerciseHead = ({ exercise, link }: Props): JSX.Element => {
  const { title, lead, num } = exercise;
  
  const content = (
    <>
      <div className={styles.num}>{num}</div>
      <div>
        <div className={styles.title}>{title}</div>  
        { lead !== 'no-lead' && <div className={styles.lead}>{lead}</div> }
      </div>
    </>
  );
  
  const className = clsx(styles.exc, {
    [styles.rounded]: link,
  });

  if (link) {
    return (
      <Link href={exercise.path} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <div className={className}>
      {content}
    </div>
  );
};

export default ExerciseHead;
