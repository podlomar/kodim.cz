import { useAppContext } from '../../AppContext';
import useLoginUrl from '../../pages/useLoginUrl';
import './styles.scss';

const NavbarUser = () => {
  const { user } = useAppContext();
  const loginUrl = useLoginUrl();

  if (user === null) {
    return (
      <div className="navbar-user">
        <a className="btn" href={loginUrl}>Přihlásit</a>
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
