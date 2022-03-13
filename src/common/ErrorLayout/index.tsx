import Layout from '../Layout';
import Navbar from '../Navbar';
import './styles.scss';

interface Props {
  title: React.ReactNode
  note: React.ReactNode
}

const ErrorLayout = ({ title, note }: Props) => {
  return (
    <Layout>
      <Navbar showBrand />
      <div className="container error-layout">
        <h2>{title}</h2>
        <p>{note}</p>
      </div>
    </Layout>
  );
};

export default ErrorLayout;
