import clsx from 'clsx';
import styles from './styles.module.scss';

interface Props {
  title: string;
  wide?: boolean;
  transparent?: boolean;
  children: React.ReactNode;
  toolbar?: React.ReactNode;
}

const Panel = ({ title, wide = false, transparent = false, toolbar, children }: Props) => {
  return (
    <div className={clsx(styles.panel, wide && styles.wide)}>
      <div className={styles.panelHead}>
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles.toolbar}>
          {toolbar}
        </div>
      </div>
      <div className={clsx(styles.panelBody, transparent && styles.transparent)}>
        {children}
      </div>
    </div>
  );
};

export default Panel;
