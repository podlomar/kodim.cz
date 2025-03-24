import { type JSX } from "react";
import { redirect } from 'next/navigation';
import { session } from 'app/session';
import MainLayout from 'app/components/MainLayout';
import Panel from 'app/components/Panel';
import Icon from 'app/components/Icon';
import css from './styles.module.scss';
import LoginForm from "app/components/LoginForm";

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<{
    returnUrl?: string;
  }>;
}

const LoginPage = async (props: Props): Promise<JSX.Element> => {
  const searchParams = await props.searchParams;

  const {
    returnUrl = '/'
  } = searchParams;

  const { user } = await session();

  if (user !== null) {
    redirect('/');
  }

  return (
    <MainLayout>
      <div className="container">
        <Panel title="Přihlášení" icon="login">
          <LoginForm />
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

          <div className={css.info}>
            <p>Nemáte ještě účet? <a href="/registrace">Zaregistrujte se</a>.</p>
            <p>Zapomněli jste heslo? <a href="/obnova-hesla">Požádejte o obnovu hesla</a>.</p>
          </div>
        </Panel>
      </div>
    </MainLayout>
  );
};

export default LoginPage;
