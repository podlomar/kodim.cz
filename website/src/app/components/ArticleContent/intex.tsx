import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface Props {
  children: ReactNode;
  head?: ReactNode;
  foot?: ReactNode;
}

const ArticleContent = (
  { head, foot, children }: Props
): JSX.Element => {
  return (
    <div className={styles.articleContent}>
      { head && <div className={styles.articleHead}>{head}</div> }
      <div className={styles.articleBody}>
        {children}
      </div>
      { foot && <div className={styles.articleFoot}>{foot}</div> }
    </div>
  )
};

export default ArticleContent;
