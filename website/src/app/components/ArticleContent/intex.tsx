import { ReactNode } from "react";
import { MenuItem } from "app/components/Menu";
import ArticleNavigation from "app/components/ArticleNavigation";
import styles from "./styles.module.scss";

interface Props {
  navItems: MenuItem[];
  activeNavKey: string;
  children: ReactNode;
  next: string | null;
  prev: string | null;
  head?: ReactNode;
  foot?: ReactNode;
}

const ArticleContent = (
  { navItems, activeNavKey, next, prev, head, foot, children }: Props
): JSX.Element => {
  return (
    <div className={styles.articleContent}>
      <ArticleNavigation navItems={navItems} activeNavKey={activeNavKey} next={next} prev={prev} />
      <div className={styles.articleMain}>
        { head && <div className={styles.articleHead}>{head}</div> }
        <div className={styles.articleBody}>
          {children}
        </div>
        { foot && <div className={styles.articleFoot}>{foot}</div> }
      </div>
    </div>
  )
};

export default ArticleContent;
