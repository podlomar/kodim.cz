'use client';

import { type JSX, useActionState } from 'react';
import { registerAction, RegisterState } from './actions';
import Form from '../Form';
import Button from '../Button';
import Alert from '../Alert';
import styles from './styles.module.scss';

const buildAlertMessage = (registerState: RegisterState): string | null => {
  switch (registerState.result) {
    case 'no-email':
      return 'E-mail je povinný údaj';
    case 'no-password':
      return 'Heslo je povinný údaj';
    case 'no-password-confirm':
      return 'Musíte zadat ověření hesla';
    case 'weak-password':
      return 'Heslo musí mít alespoň 12 znaků';
    case 'password-mismatch':
      return 'Hesla se neshodují';
    case 'gdpr':
      return 'Musíte souhlasit se zpracováním osobních údajů';
    case 'user-exists':
      return 'Uživatel s tímto e-mailem již existuje';
    case 'error':
      return 'Neznámá chyba při registraci';
    default:
      return null;
  }
}

const RegistrationForm = (): JSX.Element => {
  const [registerState, formAction, pending] = useActionState<RegisterState, FormData>(
    registerAction, 
    { 
      result: 'none',
      email: '', 
      password: '',
      passwordConfirm: '',
      gdpr: false,
      newsletter: false
    },
  );

  const alertMessage = buildAlertMessage(registerState);

  if (registerState.result === 'success') {
    return (
      <div className={styles.success}>
        <h3>Registrace proběhla úspěšně</h3>
        <p>Zkontrolujte prosím svůj e-mail. Najdete v něm odkaz pro aktivaci vašeho účtu.</p>
      </div>
    );
  }

  return (
    <Form action={formAction}>
      <Form.Fields>
        <label htmlFor="email">E-mail:</label>
        <input name="email" type="email" id="email" defaultValue={registerState.email}/>
        <label htmlFor="password">Heslo:</label>
        <input name="password" type="password" id="password" defaultValue={registerState.password}/>
        <label htmlFor="password-confirm">Heslo znova:</label>
        <input name="password-confirm" type="password" id="password-confirm" defaultValue={registerState.passwordConfirm}/>
        <input name="gdpr" type="checkbox" id="gdpr" defaultChecked={registerState.gdpr} />
        <label htmlFor="gdpr">
          Souhlasím se <a href="osobni-udaje">zpracováním osobních údajů</a>
        </label>
        <input name="newsletter" type="checkbox" id="newsletter" defaultChecked={registerState.newsletter} />
        <label htmlFor="newsletter">
          Přeji si čas od času dostat e-mail s novinkami - bez spamů, pouze jednou za delší dobu, pouze to podstatné
        </label>
      </Form.Fields>
      {alertMessage !== null && (
        <div className={styles.alertBox}>
          <Alert type="warning" title={alertMessage} />
        </div>
      )}
      <Form.Controls>
        <Button type="submit" disabled={pending}>Registrovat</Button>
      </Form.Controls>
    </Form>
  );
};

export default RegistrationForm;
