import { session } from 'app/session';
import MainLayout from 'components/MainLayout';
import Panel from 'components/Panel';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

const ProfilPage = async (): Promise<JSX.Element> => {
  const { user } = await session();
  
  if (user === null) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="container">
        <Panel title="Profil">
          <p>Přihlášen jako: <strong>{user.name}</strong></p>
          <a href="/odhlasit">Odhlásit</a>
        </Panel>
      </div>
    </MainLayout>
  );
};

export default ProfilPage;
