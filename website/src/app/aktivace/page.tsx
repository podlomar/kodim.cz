import { type JSX } from "react";
import { session } from 'app/session';
import MainLayout from 'app/components/MainLayout';
import Panel from 'app/components/Panel';
import { verifyUserEmail } from "lib/directus";

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<{
    token?: string;
  }>;
}

const ActivatePage = async (props: Props): Promise<JSX.Element> => {
  const { token } = await props.searchParams;

  let result: string;
  if (token === undefined) {
    result  = 'missing-token';
  } else {
    const { user } = await session();
    if (user !== null) {
      result = 'logged-in';
    } else {
      const verification = await verifyUserEmail(token);
      if (verification) {
        result = 'success';
      } else {
        result = 'error';
      }
    }
  }

  return (
    <MainLayout>
      <div className="container">
        <Panel title="Aktivace účtu">
          {result === 'missing-token' && (
            <p>Neplatná ověřovací URL.</p>
          )}
          {result === 'logged-in' && (
            <>
              <p>Pro aktivaci nového účtu se prosím odhlaste ze stávajícího účtu.</p>
              <p>
                <a href={`/odhlasit?returnTo=/aktivace?token=${token}`}>Odhlásit</a>
              </p>
            </>
          )}
          {result === 'success' && (
            <>
              <p>Váš účet byl úspěšně aktivován. Nyní se můžete přihlásit.</p>
              <p>
                <a href="/prihlasit">Přihlásit</a>
              </p>
            </>
          )}
          {result === 'error' && (
            <p>Při aktivaci účtu došlo k chybě.</p>
          )}
        </Panel>
      </div>
    </MainLayout>
  );
};

export default ActivatePage;
