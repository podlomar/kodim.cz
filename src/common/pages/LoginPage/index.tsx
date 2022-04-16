import queryString from 'query-string';
import { Helmet } from 'react-helmet';
import Layout from '../../Layout';
import Navbar from '../../Navbar';
import { ServerAppContext, useData } from '../../AppContext';
import './styles.scss';
import Button from '../../Button';
import GitHub from '../../icons/GitHub';

const LoginPage = () => {
  const githubClientId = useData(
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
            <Button icon={<GitHub />} href={loginUrl}>
              Pokračovat přes GitHub
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
