import { ReactNode } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

const types = ['warning', 'question', 'tip', 'note', 'remember'];

interface Props {
  type: string;
  children: ReactNode;
}

const getTitle = (type: string): string => {
  switch (type) {
    case 'warning':
      return 'Pozor';
    case 'question':
      return 'Otázka';
    case 'tip':
      return 'Tip';
    case 'note':
      return 'Poznámka';
    case 'remember':
      return 'Pamatuj';
    default:
      return 'Poznámka';
  }
}

const Box = ({ children, type }: Props) => {
  const boxType = types.includes(type) ? type : 'note';
  
  return (
    <>
      <div className={clsx(styles.boxHead, styles[`${boxType}Type`])}>
        <div className={clsx(styles.boxIcon, styles[`${boxType}Icon`])} />
        <p className={styles.boxTitle}>{getTitle(type)}</p>
      </div>
      <div className={styles.boxBody}>
        {children}
      </div>
    </>
  );
};

export default Box;
