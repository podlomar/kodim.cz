import type { JSX } from "react";
import { headers } from 'next/headers';
import pkg from '../../../../package.json';
import clsx from 'clsx';
import Brand from 'app/components/Brand';
import Avatar from "../Avatar";
import styles from './styles.module.scss';
import { session } from 'app/session';

interface Props {
  showBrand?: boolean;
  children: React.ReactNode;
}

const MainLayout = async ({ showBrand = true, children }: Props): Promise<JSX.Element> => {
  const { user } = await session();
  const pathname = (await headers()).get('x-pathname');
  return (
    <>
      <header className={clsx(styles.header, 'container')}>
        { showBrand ? <Brand size="small" /> : <div />}
        <div className={styles.user}>
          {user === null ? (
            <div className={styles.login}>
              <a href={`/prihlasit?returnUrl=${pathname ?? '/'}`}>Přihlásit</a>
              <a href="/registrace">Registrovat</a>
            </div>
          ) : (
            <div className={styles.profile}>
              <a href="/profil">{user.name}</a>
              <Avatar user={user} />
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
            <p>Tento web používá pouze nezbytné cookies pro správnou funkčnost přihlášení. Používáním webu souhlasíte s jejich využíváním. Nepoužíváme žádné sledovací ani analytické cookies.</p>
          </div>
          <div>
            <p><strong>Copyright &copy; {new Date().getFullYear()} Kódím.cz. Všechna práva vyhrazena.</strong></p>
            <p>Veškerý obsah zveřejněný na této webové stránce je chráněn autorským právem a není dovoleno jej kopírovat, reprodukovat, distribuovat nebo přenášet bez předchozího písemného souhlasu autora Kódím.cz.</p>
            <p><a href="/copyright">Celé znění</a></p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default MainLayout;
