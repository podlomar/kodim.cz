import Layout from '../../Layout';
import Navbar from '../../Navbar';
import './styles.scss';

const NotFoundPage = () => {
  return (
    <Layout>
      <Navbar showBrand />
      <p>404</p>
    </Layout>
  );
};

export default NotFoundPage;