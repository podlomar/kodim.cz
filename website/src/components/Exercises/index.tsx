import React from "react"
import { ExerciseNavItem } from "kodim-cms/esm/content/exercise";
import ExerciseHead from "components/ExerciseHead";
import styles from "./styles.module.scss";

interface Props {
  excs: ExerciseNavItem[],
}

const Exercises = ({ excs }: Props): JSX.Element => {
  return (
    <div className={styles.exercises}>
      {excs.map((exc) => <ExerciseHead exercise={exc} link={true} />)}
    </div>
  );
};

export default Exercises;
