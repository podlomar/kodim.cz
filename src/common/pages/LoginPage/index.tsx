import queryString from 'query-string';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Layout from '../../Layout';
import Navbar from '../../Navbar';
import { ServerAppContext, useData } from '../../AppContext';
import Button from '../../Button';
import GitHub from '../../icons/GitHub';
import './styles.scss';

const getBadCredentials = (context: ServerAppContext): boolean => {
  return context.store.badCredentials ?? false;
};

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const badCredentials = useData(getBadCredentials);

  const returnUrl = searchParams.get('returnUrl') ?? '/';

  const githubClientId = useData(
    async (serverContext: ServerAppContext) => serverContext.logins.githubClientId,
  );

  const authParams = queryString.stringify({
    client_id: githubClientId,
    scope: 'read:user user:email',
    allow_signup: true,
    state: JSON.stringify({ returnUrl }),
  });

  const githubLoginUrl = `https://github.com/login/oauth/authorize?${authParams}`;

  return (
    <Layout>
      <Helmet>
        <title>Přihlášení</title>
      </Helmet>
      <Navbar showBrand />
      <div className="container login">
        <div className="login-panel">
          <div className="login-panel__title">
            Přihlášení
          </div>
          <div className="login-panel__apps">
            <Button icon={<GitHub />} href={githubLoginUrl}>
              Přihlásit přes GitHub
            </Button>
          </div>
          <form
            className="login-panel__form"
            action={`/prihlasit?returnUrl=${encodeURIComponent(returnUrl)}`}
            method="POST"
          >
            <label htmlFor="loginOrEmail">Login or email:</label>
            <input
              type="text"
              id="loginOrEmail"
              name="loginOrEmail"
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
            />
            {badCredentials ? (
              <div className="alert">
                <div className="alert__icon" />
                <div className="alert__body">
                  Nesprávný login, email nebo heslo
                </div>
              </div>
            ) : null}
            <div className="form-controls">
              <button className="btn" type="submit">Přihlásit</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
