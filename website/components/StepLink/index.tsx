import React from "react"
import Link from "next/link";
import styles from "./styles.module.scss";
import clsx from "clsx";

interface Props {
  direction: 'prev' | 'prev-responsive' | 'next';
  href: string;
  label: string;
}

const StepLink = ({ direction, href, label }: Props): JSX.Element => {
  return (
    <Link
      className={clsx(
        styles.link,
        direction === 'prev'
          ? styles.linkPrev
          : direction === 'prev-responsive'
            ? styles.linkPrevResponsive
            : styles.linkNext
      )}
      href={href}
    >
      <div 
        className={clsx(
          styles.arrow,
          direction === 'next' ? styles.arrowNext : styles.arrowPrev
        )}
      />
      <div>
        {
          direction === 'next'
            ? <div>Následujicí</div>
            : <div>Předchozí</div>
        }
        <div className={styles.label}>{label}</div>
      </div>
    </Link>
  );
};

export default StepLink;
