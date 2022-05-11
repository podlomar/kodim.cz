import queryString from 'query-string';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Layout from '../../Layout';
import Navbar from '../../Navbar';
import { ServerAppContext, useData } from '../../AppContext';
import Button from '../../Button';
import GitHub from '../../icons/GitHub';
import './styles.scss';

const LoginPage = () => {
  const [searchParams] = useSearchParams();
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
              Pokračovat přes GitHub
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
