import queryString from 'query-string';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Layout from '../../Layout';
import Navbar from '../../Navbar';
import { ServerContextValue, useData } from '../../AppContext';
import InfoPanel from '../../InfoPanel';
import Button from '../../Button';
import GitHub from '../../icons/GitHub';
import './styles.scss';

const getBadCredentials = (context: ServerContextValue): boolean => {
  return context.store.badCredentials ?? false;
};

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const badCredentials = useData(getBadCredentials);

  const returnUrl = searchParams.get('returnUrl') ?? '/';

  const githubClientId = useData(
    async (serverContext: ServerContextValue) => serverContext.logins.githubClientId,
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
      <div className="container">
        <InfoPanel heading="Přihlášení">
          <div className="login-apps">
            <Button icon={<GitHub />} href={githubLoginUrl}>
              Přihlásit přes GitHub
            </Button>
          </div>
          <hr className="login-divider" />
          <form
            className="login-form"
            action={`/prihlasit?returnUrl=${encodeURIComponent(returnUrl)}`}
            method="POST"
          >
            <label>
              Uživatelské jméno nebo e-mail:
              <input
                type="text"
                name="loginOrEmail"
                autoComplete="username"
              />
            </label>

            <label>
              Heslo:
              <input
                type="password"
                name="password"
                autoComplete="password"
              />
            </label>

            {badCredentials ? (
              <div className="alert">
                <div className="alert__icon" />
                <div className="alert__body">
                  Nesprávné uživatelské jméno, e-mail nebo heslo
                </div>
              </div>
            ) : null}
            <div className="form-controls">
              <button className="btn" type="submit">Přihlásit</button>
            </div>
          </form>
        </InfoPanel>
      </div>
    </Layout>
  );
};

export default LoginPage;
