import styles from './styles.module.scss';

interface Props {
  title: string;
  children: React.ReactNode;
}

const Panel = ({ title, children }: Props) => {
  return (
    <div className={styles.panel}>
      <div className={styles.panelHead}>
        {title}
      </div>
      <div className={styles.panelBody}>
        {children}
      </div>
    </div>
  );
};

export default Panel;
