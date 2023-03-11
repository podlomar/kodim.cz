import { useCallback, useEffect, useState } from 'react';
import { ServerContextValue, useData } from '../../AppContext';
import Button from '../../Button';
import GroupList from '../../GroupList';
import InfoPanel from '../../InfoPanel';
import Layout from '../../Layout';
import Navbar from '../../Navbar';
import NotFoundPage from '../NotFoundPage';

const getUser = ({ account }: ServerContextValue): null | {
  name: string,
  groups: Array<{
    name: string,
    title: string,
    inviteToken: string | undefined,
  }>,
  appToken: string,
} => {
  if (account === null) {
    return null;
  }

  const { name, appToken } = account.user;
  const groups = account.user.groups.map((group) => ({
    name: group.name,
    title: group.title,
    inviteToken: group.inviteToken,
  }));

  return { name, groups, appToken };
};

interface AppsTokenState {
  value: string;
  visible: boolean;
  copied: boolean;
}

const AccountPage = () => {
  const user = useData(getUser);
  const [appToken, setAppToken] = useState<AppsTokenState>({
    value: user?.appToken ?? '',
    visible: false,
    copied: false,
  });

  useEffect(() => {
    const handleFocus = () => {
      setAppToken({ ...appToken, copied: false });
    };
    window.addEventListener('focus', handleFocus);

    return () => window.removeEventListener('focus', handleFocus);
  }, [appToken]);

  const toggleShowToken = useCallback(() => {
    setAppToken((current) => ({ ...current, visible: !current.visible }));
  }, []);

  const copyToken = useCallback(() => {
    navigator.clipboard.writeText(appToken.value);
    setAppToken({ ...appToken, copied: true });
  }, [appToken]);

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
          <h3>Přístupový token pro aplikace</h3>
          <p>Užitečný údaj pro provázání vašeho účtu na Kódím.cz s dalšími aplikacemi.</p>
          <input type={appToken.visible ? 'text' : 'password'} value={appToken.value} readOnly />
          <Button onClick={toggleShowToken} size="small">{appToken.visible ? 'Skrýt' : 'Zobrazit'}</Button>
          &nbsp;
          <Button
            onClick={copyToken}
            size="small"
          >
            {appToken.copied ? 'Zkopírováno' : 'Kopírovat do schránky'}
          </Button>
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
