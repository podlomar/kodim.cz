import MainLayout from 'app/components/MainLayout';
import Panel from 'app/components/Panel';
import { redirect } from 'next/navigation';
import { addSubscription } from 'lib/directus';
import isemail from 'isemail';
import styles from './styles.module.scss';

interface Props {
  searchParams: {
    topic?: string;
    result?: string;
  }
}

const action = async (topic: string | null, formData: FormData) => {
  'use server';    
  const email = formData.get('email') as string;
  if (!isemail.validate(email)) {
    redirect('/odber?result=invalid-email');
    return;
  }
  
  await addSubscription(email, topic ?? null);
  redirect('/odber?result=success');
};

const SubscribePage = ({ searchParams: { topic, result }}: Props): JSX.Element => {
  const formAction = action.bind(null, topic ?? null);
  return (
    <MainLayout>
      <div className="container">
        <Panel title="Odběr novinek">
          {result === 'success'
            ? <p>Děkujeme za přihlášení k odběru novinek.</p>
            : (
              <form action={formAction} method='POST'>
                {topic === undefined ? null : <p>Mám zájem o <strong>{topic}</strong></p>}
                <div className="formFields">
                  <label>E-mail:</label>
                  <input name="email" type="email" required autoFocus />
                </div>
                { result === 'invalid-email' && <p className={styles.alert}>Neplatný e-mail!</p>}
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
