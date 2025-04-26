'use client';

import { type JSX, useActionState } from 'react';
import { loginAction, LoginState } from './action';
import Form from '../Form';
import Button from '../Button';
import Alert from '../Alert';
import styles from './styles.module.scss';

const buildAlertMessage = (loginState: LoginState): string | null => {
  switch (loginState.alert) {
    case 'no-email':
      return 'Nezadali jste e-mail';
    case 'no-password':
      return 'Nezadali jste heslo';
    case 'invalid-credentials':
      return 'Nesprávný e-mail nebo heslo. Možná máte účet přes GitHub nebo jiného poskytovatele?';
    case 'error':
      return 'Neznámáv chyba při přihlášení';
    default:
      return null;
  }
}

const LoginForm = (): JSX.Element => {
  const [loginState, formAction, pending] = useActionState<LoginState, FormData>(
    loginAction, { alert: 'none', email: '' },
  );

  const alertMessage = buildAlertMessage(loginState);

  return (
    <Form action={formAction}>
      <Form.Fields>
        <label htmlFor="email">E-mail:</label>
        <input name="email" type="email" id="email" defaultValue={loginState.email} />
        <label htmlFor="password">Heslo:</label>
        <input name="password" type="password" id="password" />
      </Form.Fields>
      {alertMessage !== null && (
        <div className={styles.alertBox}>
          <Alert type="warning" title={alertMessage} />
        </div>
      )}
      <Form.Controls>
        <Button type="submit" disabled={pending}>Přihlásit</Button>
      </Form.Controls>
    </Form>
  );
};

export default LoginForm;
