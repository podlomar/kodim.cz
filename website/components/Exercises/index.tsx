import React from "react"
import Link from "next/link";
import { ShallowExercise } from "kodim-cms/esm/content/exercise";
import styles from "./styles.module.scss";

interface Props {
  excs: ShallowExercise[],
}

const Exercises = ({ excs }: Props): JSX.Element => {
  return (
    <div className={styles.exercises}>
      {excs.map((exc) => {
        const { num, title, lead } = exc;
        
        return (
          <Link href={exc.path} className={styles.exc}>
            <div className={styles.num}>{num}</div>
            <div>
              <div className={styles.title}>{title}</div>  
              { lead !== 'no-lead' && <div className={styles.lead}>{lead}</div> }
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Exercises;
