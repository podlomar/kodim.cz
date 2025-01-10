import React from "react";
import CzechitasInfo from "../CzechitasInfo";
import TopicView from "../TopicView";
import styles from "./styles.module.scss";
import { CoursesSite } from 'kodim-cms/esm/content/site';

interface Props {
  site: CoursesSite;
}

const CoursesOverview = ({ site }: Props): JSX.Element => {
  return (
    <>
      {site.name === 'czechitas'
        ? <CzechitasInfo /> 
        : <div className={styles.divisionIntro} />
      }
      <TopicView topicName="vyvoj-webu" courses={site.courses} />
      <TopicView topicName="programovani" courses={site.courses} />
      <TopicView topicName="analyza-dat" courses={site.courses} />
      <TopicView topicName="devops" courses={site.courses} />
    </>
  );
};

export default CoursesOverview;
