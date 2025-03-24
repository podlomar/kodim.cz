'use server';

import { requestResetPassword } from "lib/directus";

export type PasswordRequestState = 'success' | 'no-email' | 'init';

export const requestPasswordResetAction = async (
  prevState: PasswordRequestState, formData: FormData
): Promise<PasswordRequestState> => {
  const email = formData.get('email');

  if (typeof email !== 'string' || email === '') {
    return 'no-email';
  }

  await requestResetPassword(email);
  return 'success';
};
