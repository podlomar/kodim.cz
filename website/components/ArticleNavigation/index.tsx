'use client';

import React, { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { MenuItem } from "components/Menu";
import MenuIcon from "icons/MenuIcon";
import ArrowIcon from "icons/ArrowIcon";
import SkipLink from "components/SkipLink";
import styles from "./styles.module.scss";

interface Props {
  navItems: MenuItem[];
  activeNavKey: string;
  next: string | null;
  prev: string | null;
}

const ArticleNavigation = ({ navItems, activeNavKey, next, prev }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.articleNav}>
      <div className={styles.navHead}>
        <SkipLink href={prev}>
          <ArrowIcon direction="left" size="1.5rem" />
        </SkipLink>
        <button className={styles.navButton} onClick={handleToggleOpen}>
          <div className={styles.navButtonIcon}>
            <MenuIcon />
          </div>
          <div className={styles.navButtonLabel}>
            {navItems.find((item) => item.key === activeNavKey)?.label}
          </div>  
        </button>
        <SkipLink href={next}>
          <ArrowIcon direction="right" size="1.5rem" />
        </SkipLink>
      </div>
      <div className={clsx(styles.navItems, isOpen && styles.menuOpen)}>
        {
          navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={clsx({ [styles.navActive]: item.key === activeNavKey })}
            >
              {item.label}
            </Link>
          ))
        }
      </div>
    </div>
  );
};

export default ArticleNavigation;
