import type { JSX } from "react";
import CourseCard from "app/components/CourseCard";
import { Topic } from "kodim-cms/esm/content/courses-division";
import styles from "./styles.module.scss";

interface Props {
  topic: Topic,
}

const TopicView = ({ topic }: Props): JSX.Element => {
  const { name, title, lead } = topic;
  
  return (
    <div>
      <div className={styles.topicBanner}>
        <img
          src={name === 'devops' ? '/img/devops.png' : `/img/${name}.svg`}
          className={styles.image}
        />
        <div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.lead}>{lead}</p>
        </div>
      </div>
      <div className={styles.courses}>
        { topic.courses.map((course) => (
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
