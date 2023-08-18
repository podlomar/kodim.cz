import { Topic } from "kodim-cms/esm/content/topic";
import React from "react"
import styles from "./styles.module.scss";

interface Props {
  topic: Topic,
}

const TopicBanner = ({ topic }: Props): JSX.Element => {
  const { image, title, lead } = topic;
  
  return (
    <div className={styles.topicBanner}>
      <img src={image} className={styles.image} />
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.lead}>{lead}</p>
    </div>
  );
};

export default TopicBanner;
