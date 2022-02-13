import Layout from '../../Layout';
import Navbar from '../../Navbar';
import { useAppContext } from '../../AppContext';
import NotFoundPage from '../NotFoundPage';
import './styles.scss';

const AccountPage = () => {
  const { user } = useAppContext();

  if (user === null) {
    return <NotFoundPage />;
  }

  return (
    <Layout>
      <Navbar showBrand />
      <div className="container account">
        <div className="account-panel">
          <p>{user.name}</p>
          <a href="/odhlasit">Odhlásit</a>
        </div>
      </div>
    </Layout>
  );
};

export default AccountPage;
