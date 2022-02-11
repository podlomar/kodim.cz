import { useAppContext } from '../../AppContext';
import './styles.scss';

const NavbarUser = () => {
  const { user } = useAppContext();

  if (user === null) {
    return (
      <div className="navbar-user">
        <a className="btn" href="/prihlasit">Přihlásit</a>
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
}

export default NavbarUser;