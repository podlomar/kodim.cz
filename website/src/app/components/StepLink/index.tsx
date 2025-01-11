import React, { ReactNode, type JSX } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";
import clsx from "clsx";
import Icon from "app/components/Icon";

interface EnabledContent {
  status: 'enabled';
  href: string;
  label: string;
}

interface LockedContent {
  status: 'locked';
  label: string;
}

interface DisabledContent {
  status: 'disabled';
  text: ReactNode;
}

interface Props {
  direction: 'prev' | 'prev-responsive' | 'next';
  content: EnabledContent | DisabledContent | LockedContent;
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
    (content.status === 'disabled' || content.status === 'locked') && styles.disabled,
    direction === 'prev'
      ? styles.linkPrev
      : direction === 'prev-responsive'
        ? styles.linkPrevResponsive
        : styles.linkNext
  );

  if (content.status === 'disabled') {
    return (
      <div className={linkClass}>
        {arrow}
        <div className={styles.label}>{content.text}</div>
      </div>
    );
  }

  if (content.status === 'locked') {
    return (
      <div className={linkClass}>
        {arrow}
        <div>
          {
            direction === 'next'
              ? <div className={styles.direction}>
                  <span>Následujicí</span>
                  <Icon name="lock" size="1rem" />
                </div>
              : <div className={styles.direction}>
                  <Icon name="lock" size="1rem" />
                  <span>Předchozí</span>
                </div>
          }
          <div className={styles.label}>{content.label}</div>
        </div>
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
