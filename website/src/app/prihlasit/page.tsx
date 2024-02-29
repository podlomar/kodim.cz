import { redirect } from 'next/navigation';
import { session } from 'app/session';
import MainLayout from 'app/components/MainLayout';
import Panel from 'app/components/Panel';
import Icon from 'app/components/Icon';
import css from './styles.module.scss';

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: {
    returnUrl?: string;
  };
}

const LoginPage = async ({ searchParams: { returnUrl = '/' }}: Props): Promise<JSX.Element> => {
  const { user } = await session();

  if (user !== null) {
    redirect('/');
  }

  return (
    <MainLayout>
      <div className="container">
        <Panel title="Přihlášení">
          <p>
            V tuhle chvíli je možné se přihlásit pouze přes účet na GitHubu. Další možnosti
            přihlášení jsou ve vývoji.
          </p>
          <div className={css.providers}>
            <div className={css.providerLink}>
              <Icon name="github" size="1.5rem" />
              <a
                href={`${process.env.DIRECTUS_URL}/auth/login/github?redirect=${process.env.WEBSITE_URL}${returnUrl}`}
              >
                Přihlásit přes GitHub
              </a>
            </div>
          </div>
        </Panel>
      </div>
    </MainLayout>
  );
};

export default LoginPage;
