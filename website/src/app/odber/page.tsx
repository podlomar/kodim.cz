import type { JSX } from "react";
import MainLayout from 'app/components/MainLayout';
import Panel from 'app/components/Panel';
import { redirect } from 'next/navigation';
import { addSubscription } from 'lib/directus';
import isemail from 'isemail';
import styles from './styles.module.scss';

interface Props {
  searchParams: Promise<{
    topic?: string;
    status?: string;
  }>
}

const action = async (topic: string | null, formData: FormData) => {
  'use server';    
  const email = formData.get('email') as string;
  if (!isemail.validate(email)) {
    redirect('/odber?status=invalid-email');
    return;
  }
  
  await addSubscription(email, topic ?? null);
  redirect('/odber?status=success');
};

const SubscribePage = async (props: Props): Promise<JSX.Element> => {
  const searchParams = await props.searchParams;

  const {
    topic,
    status
  } = searchParams;

  const formAction = action.bind(null, topic ?? null);
  return (
    <MainLayout>
      <div className="container">
        <Panel title="Odběr novinek">
          {status === 'success' && <p>Děkujeme za přihlášení k odběru novinek.</p>}
          {status === 'canceled' && <p>Jste úspěšně odhlášeni z odběru novinek</p>}
          {status !== 'success' && status !== 'canceled' && (
            <form action={formAction} method='POST'>
              {topic === undefined ? null : <p>Mám zájem o <strong>{topic}</strong></p>}
              <div className="formFields">
                <label>E-mail:</label>
                <input name="email" type="email" required autoFocus />
              </div>
              { status === 'invalid-email' && <p className={styles.alert}>Neplatný e-mail!</p>}
              <p>Máme úctu k vašemu času a soukromí a nebudeme vás zahlcovat spamem. Novinky posíláme jednou za delší dobu s výběrem pouze toho nejdůležitějšího.</p>
            
              <div className={styles.controls}>
                <button className="btn" type="submit">Přihlásit k odběru</button>
              </div>
            </form>
          )}
        </Panel>
      </div>
    </MainLayout>
  );
};

export default SubscribePage;
