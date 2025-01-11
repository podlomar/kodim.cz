import type { JSX } from "react";
import MainLayout from 'app/components/MainLayout';
import Panel from 'app/components/Panel';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{
    token: string;
  }>;
}

interface OkPayload {
  ok: true;
  usr: string;
  id: number;
}

interface ErrorPayload {
  ok: false;
  error: 'malformed' | 'invalid';
}

type Payload = OkPayload | ErrorPayload;

const verifyToken = (token: string): Payload => {
  try {
    const decoded = jwt.verify(token, process.env.CERT_PRIVATE_KEY ?? '');

    if (typeof decoded === 'string') {
      return {
        ok: false,
        error: 'malformed',
      };
    }

    return {
      ok: true,
      usr: decoded.usr,
      id: decoded.id,
    }
  } catch (error: any) {
    if (error instanceof JsonWebTokenError) {
      const jwtError = error as JsonWebTokenError;
      console.log(jwtError.message);
      if (
        jwtError.message === 'jwt malformed'
        || jwtError.message === 'invalid token'
      ) {
        return {
          ok: false,
          error: 'malformed',
        };
      }
    }
    
    return {
      ok: false,
      error: 'invalid',
    };
  }  
}

const VerifyPage = async (props: Props): Promise<JSX.Element> => {
  const params = await props.params;

  const {
    token
  } = params;

  const payload = verifyToken(token);

  return (
    <MainLayout>
      <div className="container">
        <Panel title="Ověření certifikátu">
          {payload.ok && (
            <p>
              Toto je platný certifikát číslo {payload.id} vydaný na jméno <strong>{payload.usr}</strong>.
            </p>
          )}
          {!payload.ok && payload.error === 'malformed' && (
            <p>
              Ověřovací kód certifikátu je chybný. Zkontrolujte, zda jste načetli správný QR kód.
            </p>
          )}
          {!payload.ok && payload.error === 'invalid' && (
            <p>
              Toto není platný certifikát. Zkontrolujte, zda jste načetli správný QR kód.
            </p>
          )}
        </Panel>
      </div>
    </MainLayout>
  );
};

export default VerifyPage;
