'use server';

import { registerNewUser } from '../../../lib/directus';

export type RegisterState = {
  result: (
    'none' | 
    'success' | 
    'no-email' | 
    'no-password' | 
    'no-password-confirm' |
    'password-mismatch' | 
    'weak-password' | 
    'gdpr' |
    'user-exists' |
    'error'
  );
  email: string;
  password: string;
  passwordConfirm: string;
  gdpr: boolean;
  newsletter: boolean;
};

export const registerAction = async (
  prevState: RegisterState, formData: FormData
): Promise<RegisterState> => {
  const email = formData.get('email');
  const password = formData.get('password');
  const passwordConfirm = formData.get('password-confirm');
  const gdpr = formData.get('gdpr') === 'on';
  const newsletter = formData.get('newsletter') === 'on';

  if (typeof email !== 'string' || email === '') {
    return {
      result: 'no-email',
      email: '',
      password: '',
      passwordConfirm: '',
      gdpr,
      newsletter,
    }
  }
  
  if (typeof password !== 'string' || password === '') {
    return {
      result: 'no-password',
      email,
      password: '',
      passwordConfirm: '',
      gdpr,
      newsletter,
    }
  }

  if (typeof passwordConfirm !== 'string' || passwordConfirm === '') {
    return {
      result: 'no-password-confirm',
      email,
      password,
      passwordConfirm: '',
      gdpr,
      newsletter,
    }
  }

  if (password.length < 12) {
    return {
      result: 'weak-password',
      email,
      password,
      passwordConfirm,
      gdpr,
      newsletter,
    }
  }

  if (password !== passwordConfirm) {
    return {
      result: 'password-mismatch',
      email,
      password,
      passwordConfirm,
      gdpr,
      newsletter
    };
  }

  if (!gdpr) {
    return {
      result: 'gdpr',
      email,
      password,
      passwordConfirm,
      gdpr,
      newsletter,
    }
  }

  try {
    const result = await registerNewUser(email, password, newsletter);
    if (result === 'user-exists') {
      return {
        result: 'user-exists',
        email,
        password,
        passwordConfirm,
        gdpr,
        newsletter,
      }
    }

    if (result === 'error') {
      return {
        result: 'error',
        email,
        password,
        passwordConfirm,
        gdpr,
        newsletter,
      }
    }

    return {
      result: 'success',
      email,
      password,
      passwordConfirm,
      gdpr,
      newsletter,
    }
  } catch {
    return {
      result: 'error',
      email,
      password,
      passwordConfirm,
      gdpr,
      newsletter,
    }
  }
}