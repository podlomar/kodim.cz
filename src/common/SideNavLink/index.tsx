import clsx from 'clsx';
import './styles.scss';

interface Props {
  children: React.ReactNode,
  active?: boolean,
}

const SideNavLink = ({ children, active }: Props) => {
  return (
    <div className={clsx(
      'sidenav-link',
      { 'sidenav-link--active': active ?? false },
    )}
    >
      {children}
    </div>
  );
};

export default SideNavLink;
