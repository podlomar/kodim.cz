'use server';

import { revalidatePath } from "next/cache";
import { addToGroup, login, registerNewUser } from "../lib/directus";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const addToGroupAction = async (userId: string, groupId: string) => {
  addToGroup(userId, groupId);
  revalidatePath(`/pozvanky/${groupId}`);
};

export type LoginState = {
  alert: 'none' | 'success' | 'no-email' | 'no-password' | 'invalid-credentials' | 'error'
  email: string;
};

export const loginAction = async (
  prevState: LoginState, formData: FormData
): Promise<LoginState> => {
  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || email === '') {
    return {
      alert: 'no-email',
      email: '',
    }
  }

  if (typeof password !== 'string' || password === '') {
    return {
      alert: 'no-password',
      email,
    }
  }
  
  const sessionCookie = await login(email, password);
  if (sessionCookie === null) {
    return {
      alert: 'invalid-credentials',
      email,
    }
  }

  const cookiesStore = await cookies();
  cookiesStore.set(sessionCookie);
  redirect('/');
  
  return {
    alert: 'none',
    email: '',
  }
};
