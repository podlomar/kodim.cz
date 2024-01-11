import pkg from '../../../package.json';
import clsx from 'clsx';
import Brand from 'components/Brand';
import styles from './styles.module.scss';
import { session } from 'app/session';

interface Props {
  showBrand?: boolean;
  children: React.ReactNode;
}

const MainLayout = async ({ showBrand = true, children }: Props): Promise<JSX.Element> => {
  const { user } = await session();
  
  return (
    <>
      <header className={clsx(styles.header, 'container')}>
        { showBrand ? <Brand size="small" /> : <div />}
        <div className={styles.user}>
          {user === null ? (
            <a href="/prihlasit">Přihlásit</a>
          ) : (
            <a href="/profil">{user.firstName}</a>
          )}
        </div>
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
