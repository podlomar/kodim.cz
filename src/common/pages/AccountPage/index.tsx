import cookie from 'cookie';
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

interface TokenState {
  value: string;
  visible: boolean;
  copied: boolean;
}

const AccountPage = () => {
  const user = useData(getUser);
  const [token, setToken] = useState<TokenState>({
    value: '',
    visible: false,
    copied: false,
  });

  const toggleShowToken = useCallback(() => {
    setToken((current) => ({ ...current, visible: !current.visible }));
  }, []);

  const copyToken = useCallback(() => {
    navigator.clipboard.writeText(token.value);
    setToken({ ...token, copied: true });
  }, [token]);

  useEffect(() => {
    setToken({
      value: cookie.parse(document.cookie).token,
      visible: false,
      copied: false,
    });
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      setToken({ ...token, copied: false });
    };
    window.addEventListener('focus', handleFocus);

    return () => window.removeEventListener('focus', handleFocus);
  }, [token]);

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
          <input type={token.visible ? 'text' : 'password'} value={token.value} readOnly />
          <Button
            onClick={copyToken}
            size="small"
          >
            {token.copied ? 'Zkopírováno' : 'Kopírovat do schránky'}
          </Button>
          &nbsp;
          <Button onClick={toggleShowToken} size="small">{token.visible ? 'Skrýt' : 'Zobrazit'}</Button>
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
