"use client";

import React, { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import styles from './styles.module.scss';

export interface MenuItem {
  key: string;
  label: string;
  href: string;
}

interface Props {
  items: MenuItem[];
  activeKey: string;
}

const Menu = ({ items, activeKey }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeItem = items.find((item) => item.key === activeKey);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.menu}>
      <button
        onClick={toggleMenu}
        className={styles.menuBtn}
      />
      {!menuOpen && (
        <div className={styles.selectedItem}>{activeItem?.label}</div>
      )}
      <div className={clsx(styles.items, { [styles.hideItems]: !menuOpen })}>
        {
          items.map((item) => (
            <Link
              className={clsx({ [styles.active]: item.key === activeKey })}
              key={item.key}
              href={item.href}
            >
              {item.label}
            </Link>
          ))
        }
      </div>
    </div>
  );
};

export default Menu;
