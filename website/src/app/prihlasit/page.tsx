import { session } from 'app/layout';
import MainLayout from 'components/MainLayout';
import Panel from 'components/Panel';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

const LoginPage = async (): Promise<JSX.Element> => {
  const { user } = await session();

  if (user !== null) {
    redirect('/');
  }

  return (
    <MainLayout>
      <div className="container">
        <Panel title="Přihlášení">
          <a
            href={`${process.env.DIRECTUS_URL}/auth/login/github?redirect=${process.env.WEBSITE_URL}/prihlasit`}
          >
            Přihlásit před GitHub
          </a>
        </Panel>
      </div>
    </MainLayout>
  );
};

export default LoginPage;
