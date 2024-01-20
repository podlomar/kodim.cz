import { redirect } from 'next/navigation';
import { session } from 'app/session';
import MainLayout from 'components/MainLayout';
import Panel from 'components/Panel';
import Icon from 'components/Icon';
import css from './styles.module.scss';

export const dynamic = 'force-dynamic';

const RegisterPage = async (): Promise<JSX.Element> => {
  const { user } = await session();

  if (user !== null) {
    redirect('/');
  }

  return (
    <MainLayout>
      <div className="container">
        <Panel title="Registrace" transparent>
          <p>
            Žádný z těchto údajů nebude zobrazen nikde na webu ani nebude sdílen s třetími stranami.
          </p>
          <form>
            <div className={css.fields}>
              <label htmlFor="name">Celé jméno:</label>
              <input type="text" id="name" />
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" />
            </div>
            <div className={css.checkfield}>
              <input type="checkbox" id="gdpr" />
              <label htmlFor="gdpr">
                Souhlasím se <a href="osobni-udaje">zpracováním osobních údajů</a>
              </label>
            </div>
            <div className={css.checkfield}>
              <input type="checkbox" id="newsletter" />
              <label htmlFor="newsletter">
                Nepřeji si dostávat e-maily s novinkami ohledně nových kurzů a akcí na Kódím.cz
              </label>
            </div>
            <div className={css.controls}>
              <button type="submit" className="btn">
                Registrovat
              </button>
            </div>
          </form>
        </Panel>
      </div>
    </MainLayout>
  );
};

export default RegisterPage;
