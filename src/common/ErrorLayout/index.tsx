import { useSetHttpStatus } from '../AppContext';
import Layout from '../Layout';
import Navbar from '../Navbar';
import './styles.scss';

interface Props {
  title: React.ReactNode
  status: number,
}

const ErrorReport = ({ title, status }: Props) => {
  const setHttpStatus = useSetHttpStatus();
  setHttpStatus(status);

  return (
    <Layout>
      <Navbar showBrand />
      <div className="container error-layout">
        <h2>{title}</h2>
        <p>
          Chyba
          {' '}
          {status}
        </p>
      </div>
    </Layout>
  );
};

export default ErrorReport;
