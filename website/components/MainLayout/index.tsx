import pkg from 'package.json';
import clsx from 'clsx';
import Brand from 'components/Brand';
import styles from './styles.module.scss';

interface Props {
  showBrand?: boolean;
  children: React.ReactNode;
}

const MainLayout = ({ showBrand, children }: Props): JSX.Element => {
  return (
    <>
      <header className={clsx(styles.header, 'container')}>
        { showBrand && <Brand size="small" /> }
      </header>
      <main>
        {children}
      </main>
      <footer className={styles.footer}>
        <div className={clsx('container', styles.footerContent)}>
          <p className={styles.footerTitle}>Kódím.cz</p>
          <p className={styles.version}>Verze {pkg.version}</p>
        </div>
      </footer>
    </>
  );
};

export default MainLayout;
