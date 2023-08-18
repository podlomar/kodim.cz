import React, { ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";
import { MenuItem } from "components/Menu";
import styles from "./styles.module.scss";

interface Props {
  navItems: MenuItem[];
  activeNavKey: string;
  children: ReactNode;
}

const ArticleContent = ({ navItems, activeNavKey, children }: Props): JSX.Element => {
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
      <div className={styles.articleBody}>
        {children}
      </div>
    </div>
  )
};

export default ArticleContent;
