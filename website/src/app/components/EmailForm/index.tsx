'use client';

import { type JSX, useActionState } from 'react';
import Form from '../Form';
import Button from '../Button';
import { PasswordRequestState, requestPasswordResetAction } from './action';

const EmailForm = (): JSX.Element => {
  const [requestState, formAction, pending] = useActionState<PasswordRequestState, FormData>(
    requestPasswordResetAction, 'init',
  );

  if (requestState === 'success') {
    return (
      <p>
        Pokud u nás existuje účet s tímto e-mailem, do vaši e-mailové schránky by měl dorazit odkaz pro obnovu hesla.
      </p>
    );
  }

  return (
    <Form action={formAction}>
      <p>
        Zadejte e-mailovou adresu spojenou s vaším účtem. Odešleme vám odkaz pro obnovu hesla.
      </p>
      <Form.Fields>
        <label htmlFor="email">E-mail:</label>
        <input name="email" type="email" id="email" />
      </Form.Fields>
      <Form.Controls>
        <Button type="submit" disabled={pending}>Obnovit heslo</Button>
      </Form.Controls>
    </Form>
  );
};

export default EmailForm;
