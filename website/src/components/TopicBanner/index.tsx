import React from "react"
import styles from "./styles.module.scss";
import { Topic } from "kodim-cms/esm/content/topic.js";

interface Props {
  topic: Topic,
}

const TopicBanner = ({ topic }: Props): JSX.Element => {
  const { name, title, lead } = topic;
  
  return (
    <div className={styles.topicBanner}>
      <img src={`/img/${name}.svg`} className={styles.image} />
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.lead}>{lead}</p>
    </div>
  );
};

export default TopicBanner;
