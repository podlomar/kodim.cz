import { ServerAppContext, useData } from '../../AppContext';
import Button from '../../Button';
import useLoginUrl from '../../pages/useLoginUrl';
import './styles.scss';

interface UserInfo {
  avatarUrl: string;
  name: string;
}

const getUser = (context: ServerAppContext): UserInfo | null => {
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
  const loginUrl = useLoginUrl();

  if (user === null) {
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
