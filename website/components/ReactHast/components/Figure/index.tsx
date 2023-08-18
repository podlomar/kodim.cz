import React from "react";
import styles from "./styles.module.scss";

interface Props {
  src: string,
}

const Figure = ({ src }: Props): JSX.Element => {
  return <img className={styles.figure} src={src} />;
};

export default Figure;
