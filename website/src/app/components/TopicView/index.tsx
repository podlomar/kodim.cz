import React from "react"
import CourseCard from "app/components/CourseCard";
import { CourseLink } from "kodim-cms/esm/content/course";
import { getTopic } from "./topics";
import styles from "./styles.module.scss";

interface Props {
  topicName: string;
  courses: CourseLink[];
}

const TopicView = ({ topicName, courses }: Props): JSX.Element | null => {
  const topic = getTopic(topicName);
  if (topic === null) {
    return null;
  }

  const { title, lead, image } = topic;
  const topicCourses = courses.filter((course) => course.topic === topicName);

  if (topicCourses.length === 0) {
    return null;
  }

  return (
    <div>
      <div className={styles.topicBanner}>
        <img
          src={image}
          className={styles.image}
        />
        <div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.lead}>{lead}</p>
        </div>
      </div>
      <div className={styles.courses}>
        {topicCourses.map((course) => (
          <CourseCard
            key={course.name}
            course={course}
          />
        ))}
      </div>
    </div>
  );
};

export default TopicView;
