import { useCallback, useEffect, useState } from 'react';
import { ServerContextValue, useData } from '../../AppContext';
import Button from '../../Button';
import GroupList from '../../GroupList';
import InfoPanel from '../../InfoPanel';
import Layout from '../../Layout';
import Navbar from '../../Navbar';
import NotFoundPage from '../NotFoundPage';

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
  const [token, setToken] = useState('');
  const [showToken, setShowToken] = useState(false);
  const toggleTokenVisibility = useCallback(() => {
    setShowToken((current) => !current);
  }, []);

  useEffect(() => {
    setToken(document.cookie.split(';').find((cookie) => cookie.startsWith('token='))?.split('=')[1] ?? '');
  }, []);

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
          <h3>Přístupový token</h3>
          <p>Užitečný údaj pro provázání vašeho účtu na Kódím.cz s dalšími aplikacemi.</p>
          <input type={showToken ? 'text' : 'password'} value={token} readOnly />
          <Button onClick={toggleTokenVisibility} size="small">{showToken ? 'Skrýt' : 'Zobrazit'}</Button>
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
