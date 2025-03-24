import React, { ReactNode, type JSX } from 'react';
import Icon, { IconName } from '../Icon';
import styles from './styles.module.scss';
import clsx from 'clsx';

interface Props {
  type: 'warning';
  title: string;
  body?: ReactNode;
}

const Alert = ({ type, title, body}: Props): JSX.Element => {
  return (
    <div className={clsx(styles.alert, styles[type])}>
      <Icon className={styles.icon} name={type} size="1.5rem" />
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        {body && <div className={styles.body}>{body}</div>}
      </div>
    </div>
  );
};

export default Alert;
