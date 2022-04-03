import pkg from '../../../package.json';
import './styles.scss';

const Footer = () => {
  return (
    <footer className="layout__footer">
      <div className="container footer">
        <div className="footer__title">
          Kódím.cz
        </div>
        <a className="footer__version" href="/changelog/">
          Verze
          {' '}
          {pkg.version}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
