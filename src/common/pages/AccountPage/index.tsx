import Layout from '../../Layout';
import Navbar from '../../Navbar';
import { ServerContextValue, useData } from '../../AppContext';
import InfoPanel from '../../InfoPanel';
import Button from '../../Button';
import NotFoundPage from '../NotFoundPage';
import GroupList from '../../GroupList';

const getUser = ({ account }: ServerContextValue): null | {
  name: string, groups: Array<{
    name: string,
    title: string,
    inviteToken: string | undefined,
  }>,
} => {
  if (account === null) {
    return null;
  }

  const { name } = account.user;
  const groups = account.user.groups.map((group) => ({
    name: group.name,
    title: group.title,
    inviteToken: group.inviteToken,
  }));

  return { name, groups };
};

const AccountPage = () => {
  const user = useData(getUser);

  if (user === null) {
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
          <p>
            Jméno:
            {' '}
            <strong>{user.name}</strong>
          </p>
          {user.groups.length > 0 && (
            <>
              <h3>Vaše skupiny</h3>
              <GroupList items={user.groups} />
            </>
          )}
        </InfoPanel>
      </div>
    </Layout>
  );
};

export default AccountPage;
