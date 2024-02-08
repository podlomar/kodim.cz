import { session } from 'app/session';
import MainLayout from 'app/components/MainLayout';
import Panel from 'app/components/Panel';
import { notFound } from 'next/navigation';
import styles from './styles.module.scss';
import { p } from '@directus/sdk/dist/index-Szt1hiPf';

export const dynamic = 'force-dynamic';

const ProfilPage = async (): Promise<JSX.Element> => {
  const { user } = await session();
  
  if (user === null) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="container">
        <Panel
          title="Profil"
          toolbar={<a href="/odhlasit">Odhlásit</a>}
        >
          <div className={styles.profile}>
            <img
              src={user.avatarUrl ?? '/img/avatar.svg'}
              alt="Avatar"
              className={styles.avatar}
            />
            <div className={styles.info}>
              <span>Jméno:</span><span>{user.name}</span>
              <span>E-mail:</span><span>{user.email}</span>
            </div>
          </div>
          <h2>Skupiny</h2>
          { user.groups.length === 0 ? (
            <p>Nejste členem žádné skupiny.</p>
          ) : (
            <div className={styles.groups}>
              {user.groups.map((group) => (
                <p>{group.name}</p>
              ))}
            </div>
          )}
        </Panel>
      </div>
    </MainLayout>
  );
};

export default ProfilPage;
