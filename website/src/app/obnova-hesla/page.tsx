import { type JSX } from "react";
import MainLayout from 'app/components/MainLayout';
import Panel from 'app/components/Panel';
import EmailForm from "app/components/EmailForm";
import PasswordForm from "app/components/PasswordForm";
import jwt from 'jwt-simple';
import { decodePasswordResetToken, safeDecodeJwt } from "lib/jwt";
import Alert from "app/components/Alert";

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<{
    token: string;
  }>;
}

const ResetPage = async (props: Props): Promise<JSX.Element> => {
  const { token } = await props.searchParams;
  
  const decodedToken = token !== undefined 
    ? decodePasswordResetToken(token) ?? 'invalid'
    : 'missing';

  return (
    <MainLayout>
      <div className="container">
        <Panel title="Obnovení hesla" icon="lock">
          {decodedToken === 'missing' && <EmailForm />}
          {decodedToken === 'invalid' && (
            <p>Odkaz pro obnovu hesla je neplatný nebo vypršel.</p>
          )}
          {decodedToken !== 'missing' && decodedToken !== 'invalid' && (
            <PasswordForm token={token} email={decodedToken.email}/>
          )}
        </Panel>
      </div>
    </MainLayout>
  );
};

export default ResetPage;
