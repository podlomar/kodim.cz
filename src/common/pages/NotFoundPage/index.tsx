import Layout from '../../Layout';
import Navbar from '../../Navbar';
import './styles.scss';

const NotFoundPage = () => {
  return (
    <Layout>
      <Navbar showBrand />
      <div className="container not-found">
        <h2>Stránka nenalezena</h2>
        <p>Chyba 404</p>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
