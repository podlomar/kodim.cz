'use server';

import { resetPassword } from "lib/directus";

export type PasswordState = {
  result: (
    'init' | 
    'success' | 
    'no-password' | 
    'no-password-confirm' |
    'password-mismatch' | 
    'weak-password' |
    'error'
  );
  password: string;
  passwordConfirm: string;
};

export const passwordResetAction = async (
  token: string, prevState: PasswordState, formData: FormData,
): Promise<PasswordState> => {
  const password = formData.get('password');
  if (typeof password !== 'string' || password === '') {
    return {
      result: 'no-password',
      password: '',
      passwordConfirm: '',
    }
  }

  const passwordConfirm = formData.get('password-confirm');
  if (typeof passwordConfirm !== 'string' || passwordConfirm === '') {
    return {
      result: 'no-password-confirm',
      password,
      passwordConfirm: '',
    }
  }

  if (password !== passwordConfirm) {
    return {
      result: 'password-mismatch',
      password,
      passwordConfirm,
    }
  }

  if (password.length < 12) {
    return {
      result: 'weak-password',
      password,
      passwordConfirm,
    }
  }

  await resetPassword(token, password);
  return {
    result: 'success',
    password: '',
    passwordConfirm: '',
  }
};
