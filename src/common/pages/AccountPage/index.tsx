import Layout from '../../Layout';
import Navbar from '../../Navbar';
import { ServerContextValue, useData } from '../../AppContext';
import InfoPanel from '../../InfoPanel';
import Button from '../../Button';
import NotFoundPage from '../NotFoundPage';

const getUserName = (context: ServerContextValue): string | null => {
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
      <div className="container">
        <InfoPanel
          heading="Účet"
          footer={<Button href="/odhlasit">Odhlásit</Button>}
        >
          <p>{userName}</p>
        </InfoPanel>
      </div>
    </Layout>
  );
};

export default AccountPage;
