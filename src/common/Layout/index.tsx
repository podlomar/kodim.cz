import Footer from '../Footer';
import './styles.scss';

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="layout">
      <div>
        {children}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
