import clsx from 'clsx';
import styles from './styles.module.scss';
import Icon, { IconName } from '../Icon';

interface Props {
  title: string;
  icon?: IconName;
  wide?: boolean;
  transparent?: boolean;
  children: React.ReactNode;
  toolbar?: React.ReactNode;
}

const Panel = ({ title, icon, wide = false, transparent = false, toolbar, children }: Props) => {
  return (
    <div className={clsx(styles.panel, wide && styles.wide)}>
      <div className={styles.panelHead}>
        {icon && <Icon name={icon} size="1.5rem" />}
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
