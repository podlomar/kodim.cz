import React, { ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";
import { MenuItem } from "components/Menu";
import styles from "./styles.module.scss";

interface Props {
  navItems: MenuItem[];
  activeNavKey: string;
  children: ReactNode;
  head?: ReactNode;
  foot?: ReactNode;
}

const ArticleContent = (
  { navItems, activeNavKey, head, foot, children }: Props
): JSX.Element => {
  return (
    <div className={styles.articleContent}>
      <div className={styles.articleNav}>
        {
          navItems.map((item) => (
            <Link
              href={item.href}
              className={clsx({ [styles.navActive]: item.key === activeNavKey })}
            >
              {item.label}
            </Link>
          ))
        }
      </div>
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
