import React, { ReactNode } from "react"
import Link from "next/link";
import styles from "./styles.module.scss";
import clsx from "clsx";

interface EnabledContent {
  enabled: true;
  href: string;
  label: string;
}

interface DisabledContent {
  enabled: false;
  text: ReactNode;
}

interface Props {
  direction: 'prev' | 'prev-responsive' | 'next';
  content: EnabledContent | DisabledContent;
}

const StepLink = ({ direction, content }: Props): JSX.Element => {
  const arrow = (
    <div 
      className={clsx(
        styles.arrow,
        direction === 'next' ? styles.arrowNext : styles.arrowPrev
      )}
    />
  );

  const linkClass = clsx(
    styles.link,
    content.enabled === false && styles.disabled,
    direction === 'prev'
      ? styles.linkPrev
      : direction === 'prev-responsive'
        ? styles.linkPrevResponsive
        : styles.linkNext
  );

  if (content.enabled === false) {
    return (
      <div className={linkClass}>
        {arrow}
        <div className={styles.label}>{content.text}</div>
      </div>
    );
  }

  return (
    <Link
      className={linkClass}
      href={content.href}
    >
      {arrow}
      <div>
        {
          direction === 'next'
            ? <div>Následujicí</div>
            : <div>Předchozí</div>
        }
        <div className={styles.label}>{content.label}</div>
      </div>
    </Link>
  );
};

export default StepLink;
