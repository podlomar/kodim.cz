import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router';
import Layout from '../../Layout';
import Navbar from '../../Navbar';
import { ServerAppContext, useData } from '../../AppContext';
import InfoPanel from '../../InfoPanel';
import InvitationMessage, { Invitation } from './InvitationMessage';
import Button from '../../Button';

const getInvitation = (context: ServerAppContext): Invitation => {
  return context.store.invitation;
};

const InvitePage = () => {
  const { pathname } = useLocation();
  const invitation = useData(getInvitation);

  return (
    <Layout>
      <Helmet>
        <title>Pozvánka</title>
      </Helmet>
      <Navbar showBrand />
      <div className="container">
        <InfoPanel
          heading="Pozvánka do skupiny"
          footer={invitation.status === 'no-login' ? (
            <Button href={`/prihlasit?returnUrl=${pathname}`}>Přihlásit</Button>
          ) : (
            <Button href="/">Zpět na hlavní stránku</Button>
          )}
        >
          <InvitationMessage invitation={invitation} />
        </InfoPanel>
      </div>
    </Layout>
  );
};

export default InvitePage;
