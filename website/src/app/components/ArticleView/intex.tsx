import { ReactNode, type JSX } from "react";
import { MenuItem } from "app/components/Menu";
import ArticleNavigation from "app/components/ArticleNavigation";
import styles from "./styles.module.scss";
import ArticleContent from "../ArticleContent/intex";

interface Props {
  navItems: MenuItem[];
  activeNavKey: string;
  children: ReactNode;
  next: string | null;
  prev: string | null;
  head?: ReactNode;
  foot?: ReactNode;
}

const ArticleView = (
  { navItems, activeNavKey, next, prev, head, foot, children }: Props
): JSX.Element => {
  return (
    <div className={styles.articleView}>
      <ArticleNavigation navItems={navItems} activeNavKey={activeNavKey} next={next} prev={prev} />
      <ArticleContent head={head} foot={foot}>
        {children}
      </ArticleContent>
    </div>
  )
};

export default ArticleView;
