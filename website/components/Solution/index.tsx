'use client';

import React, { useState } from "react"
import { Root } from 'hast';
import ReactHast from "components/ReactHast";
import styles from "./styles.module.scss";

interface Props {
  root: Root | 'locked',
}

const Solution = ({ root }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.head}>
        <h2>Řešení</h2>
        <button 
          className={styles.toggle}
          onClick={toggleOpen}
          disabled={root === 'locked'}
        >
          {
            root === 'locked'
              ? 'Zamčeno'
              : isOpen
                ? 'Skrýt'
                : 'Zobrazit'
          }
        </button>
      </div>
      {isOpen && root !== 'locked' && <ReactHast root={root} />}
    </>
  );
};

export default Solution;
