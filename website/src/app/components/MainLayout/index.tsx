import pkg from '../../../../package.json';
import clsx from 'clsx';
import Brand from 'app/components/Brand';
import styles from './styles.module.scss';
import { session } from 'app/session';
import Icon from 'app/components/Icon';

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
            <div className={styles.login}>
              <a href="/prihlasit">Přihlásit</a>
            </div>
          ) : (
            <div className={styles.profile}>
              <a href="/profil">{user.name}</a>
              <img
                className={styles.userIcon}
                src={user.avatarUrl ?? '/img/avatar.svg'}
                alt="Avatar"
              />
            </div>
          )}
        </div>
      </header>
      <main>
        {children}
      </main>
      <footer className={styles.footer}>
        <div className={clsx('container', styles.footerContent)}>
          <div>
            <p className={styles.footerTitle}>Kódím.cz</p>
            <p className={styles.version}>Verze {pkg.version}</p>  
          </div>
          <div>
            <p><a href="/osobni-udaje">Ochrana osobních údajů</a></p>
            <p><strong>Cookies</strong></p>
            <p>Tento web používá pouze nezbytné cookies pro správnou funkčnost přihlášení. Používáním webu souhlasíte s jejich využívánímn. Nepoužíváme žádné sledovací ani analytické cookies.</p>
          </div>
          <div>
            <p><strong>Copyright &copy; 2024 Kódím.cz. Všechna práva vyhrazena.</strong></p>
            <p>Veškerý obsah zveřejněný na této webové stránce je chráněn autorským právem a není dovoleno jej kopírovat, reprodukovat, distribuovat nebo přenášet bez předchozího písemného souhlasu Kódím.cz.</p>
            <p><a href="/copyright">Celé znění</a></p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default MainLayout;
