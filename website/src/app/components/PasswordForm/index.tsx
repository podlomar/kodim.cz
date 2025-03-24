'use client';

import { type JSX, useActionState } from 'react';
import Form from '../Form';
import Button from '../Button';
import { passwordResetAction, PasswordState } from './action';
import Alert from '../Alert';
import styles from './styles.module.scss';

const buildAlertMessage = (passwordState: PasswordState): string | null => {
  switch (passwordState.result) {
    case 'no-password':
      return 'Zadejte vaše nové heslo';
    case 'no-password-confirm':
      return 'Zadejte prosím ověření hesla';
    case 'weak-password':
      return 'Heslo musí mít alespoň 12 znaků';
    case 'password-mismatch':
      return 'Hesla se neshodují';
    case 'error':
      return 'Neznámáv chyba při přihlášení';
    default:
      return null;
  }
}

interface Props {
  token: string;
  email: string;
}

const PasswordForm = ({ token, email }: Props): JSX.Element => {
  const passwordResetActionWithToken = passwordResetAction.bind(null, token);
  
  const [passwordState, formAction, pending] = useActionState<PasswordState, FormData>(
    passwordResetActionWithToken, { result: 'init', password: '', passwordConfirm: '' },
  );

  if (passwordState.result === 'success') {
    return (
      <p>
        Nové heslo bylo úspěšně uloženo. Nyní se můžete <a href="/prihlasit">přihlásit</a>.
      </p>
    );
  }

  const alertMessage = buildAlertMessage(passwordState);

  return (
    <Form action={formAction}>
      <p>
        Zadejte nové heslo pro účet s adresou <strong>{email}</strong>.
      </p>
      <Form.Fields>
        <label htmlFor="password">Nové heslo:</label>
        <input name="password" type="password" id="password" defaultValue={passwordState.password} />
        <label htmlFor="password-confirm">Heslo znova:</label>
        <input name="password-confirm" type="password" id="password-confirm" defaultValue={passwordState.passwordConfirm} />
      </Form.Fields>
      {alertMessage !== null && (
        <div className={styles.alertBox}>
          <Alert type="warning" title={alertMessage} />
        </div>
      )}
      <Form.Controls>
        <Button type="submit" disabled={pending}>Uložit heslo</Button>
      </Form.Controls>
    </Form>
  );
};

export default PasswordForm;
