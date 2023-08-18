import clsx from 'clsx';
import { titleCase } from 'title-case';
import styles from './styles.module.scss';

interface Props {
  size: 'small' | 'large',
}

const Brand = ({ size = 'small' }: Props) => {
  return (
    <a className={clsx(styles.brand, styles[`brand${titleCase(size)}`])} href="/">
      <div className={styles.logo} />
      <div className={styles.name}>
        <span className={styles.site}>
          Kódím
        </span>
        <span className={styles.tld}>
          .cz
        </span>
      </div>
    </a>
  );
};

export default Brand;
