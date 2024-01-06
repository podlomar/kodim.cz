import styles from './styles.module.scss';

interface Props {
  cs: string,
  en: string,
}

const Term = ({ cs, en }: Props) => {
  return (
    <span className={styles.term}>
      <span className={styles.tooltip}>{en}</span>
      <span>{cs}</span>
      <i className={styles.flag} />
    </span>
  );
};

export default Term;
