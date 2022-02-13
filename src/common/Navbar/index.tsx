import { Crumbs } from 'kodim-cms/esm/content/resource';
import Brand from '../Brand';
import NavbarUser from './NavbarUser';
import './styles.scss';

interface Props {
  crumbs?: Crumbs,
  showBrand: boolean,
}

const Navbar = ({ crumbs, showBrand }: Props) => {
  return (
    <div className="container navbar">
      <div className="navbar-menu">
        {showBrand
          ? <Brand size="small" />
          : <div />}
        <NavbarUser />
      </div>

      {crumbs === undefined
        ? null
        : (
          <div className="crumbs">
            {crumbs.map((step) => (
              <span key={step.path}>
                {' '}
                /
                <a href={step.path}>{step.title}</a>
              </span>
            ))}
          </div>
        )}
    </div>
  );
};

export default Navbar;
