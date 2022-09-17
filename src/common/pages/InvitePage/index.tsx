import { Helmet } from 'react-helmet';
import Layout from '../../Layout';
import Navbar from '../../Navbar';
import { ServerAppContext, useData } from '../../AppContext';
import InvitationMessage, { Invitation } from './InvitationMessage';
// import Button from '../../Button';
import './styles.scss';

const getInvitation = (context: ServerAppContext): Invitation => {
  return context.store.invitation;
};

const InvitePage = () => {
  const invitation = useData(getInvitation);

  return (
    <Layout>
      <Helmet>
        <title>Pozvánka</title>
      </Helmet>
      <Navbar showBrand />
      <div className="container">
        <div className="panel">
          <div className="panel__title">
            Pozvánka do skupiny
          </div>
          <div className="panel__body">
            <InvitationMessage invitation={invitation} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InvitePage;
