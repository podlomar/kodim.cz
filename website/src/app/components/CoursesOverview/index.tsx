import React, { type JSX } from "react";
import { CoursesDivision } from "kodim-cms/esm/content/courses-division";
import CzechitasInfo from "../CzechitasInfo";
import TopicView from "../TopicView";
import styles from "./styles.module.scss";

interface Props {
  division: CoursesDivision;
}

const CoursesOverview = ({ division }: Props): JSX.Element => {
  return (
    <>
      {division.name === 'czechitas'
        ? <CzechitasInfo /> 
        : <div className={styles.divisionIntro} />
      }
      {division.topics.map((topic) => (
        <TopicView key={topic.name} topic={topic} />
      ))}
    </>
  );
};

export default CoursesOverview;
