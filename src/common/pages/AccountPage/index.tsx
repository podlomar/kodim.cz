import Layout from '../../Layout';
import Navbar from '../../Navbar';
import { ServerAppContext, useData } from '../../AppContext';
import NotFoundPage from '../NotFoundPage';
import './styles.scss';

const getUserName = (context: ServerAppContext): string | null => {
  if (context.account === null) {
    return null;
  }

  return context.account.user.name;
};

const AccountPage = () => {
  const userName = useData(getUserName);

  if (userName === null) {
    return <NotFoundPage />;
  }

  return (
    <Layout>
      <Navbar showBrand />
      <div className="container account">
        <div className="account-panel">
          <p>{userName}</p>
          <a href="/odhlasit">Odhlásit</a>
        </div>
      </div>
    </Layout>
  );
};

export default AccountPage;
