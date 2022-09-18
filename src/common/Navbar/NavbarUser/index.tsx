import { ServerContextValue, useData, useAppContext } from '../../AppContext';
import Button from '../../Button';
import './styles.scss';

interface UserInfo {
  avatarUrl: string;
  name: string;
}

const getUser = (context: ServerContextValue): UserInfo | null => {
  if (context.account === null) {
    return null;
  }

  const { user } = context.account;

  return {
    avatarUrl: user.avatarUrl,
    name: user.name,
  };
};

const NavbarUser = () => {
  const user = useData(getUser);
  const { url } = useAppContext();

  if (user === null) {
    const loginUrl = url.startsWith('/prihlasit')
      ? url
      : `/prihlasit?returnUrl=${encodeURIComponent(url)}`;

    return (
      <div className="navbar-user">
        <Button href={loginUrl}>Přihlásit</Button>
      </div>
    );
  }

  return (
    <div className="navbar-user">
      <a className="navbar-user__name" href="/ucet">{user.name}</a>
      <img
        className="navbar-user__avatar"
        src={user.avatarUrl}
        alt={user.name}
      />
    </div>
  );
};

export default NavbarUser;
