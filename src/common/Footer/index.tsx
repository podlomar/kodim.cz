import pkg from '../../../package.json';
import './styles.scss';

const Footer = () => {
  return (
    <footer className="layout__footer">
      <div className="container footer">
        <div className="footer__title">
          Kódím.cz
        </div>
        <div className="footer__version">
          Verze
          {' '}
          {pkg.version}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
