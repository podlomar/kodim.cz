import { ReactNode } from 'react';
import styles from './styles.module.scss';

interface Props {
  children: ReactNode;
}

const Warning = ({ children }: Props) => {
  return (
    <div className={styles.warning}>
      <div className={styles.icon} />
      <div className={styles.body}>
        {children}
      </div>
    </div>
  );
};

export default Warning;
