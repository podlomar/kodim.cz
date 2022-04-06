import queryString from 'query-string';
import { Helmet } from 'react-helmet';
import Layout from '../../Layout';
import Navbar from '../../Navbar';
import { ServerAppContext, useData } from '../../AppContext';
import './styles.scss';

const LoginPage = () => {
  const githubClientId = useData(
    ['logins'],
    async (serverContext: ServerAppContext) => serverContext.logins.githubClientId,
  );

  const params = queryString.stringify({
    client_id: githubClientId,
    scope: 'read:user user:email',
    allow_signup: true,
  });
  const loginUrl = `https://github.com/login/oauth/authorize?${params}`;

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
            <a className="btn btn-app-login" href={loginUrl}>
              <i className="github-icon" />
              <span>Pokračovat přes GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
