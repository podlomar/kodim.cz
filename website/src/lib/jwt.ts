import jwt from 'jwt-simple';

export const safeDecodeJwt = (token: string): Record<string, any> | null => {
  try {
    const decoded = jwt.decode(token, process.env.DIRECTUS_SECRET!, false, 'HS256');
    if (typeof decoded !== 'object') {
      return null;
    }

    return decoded;
  } catch (error) {
    console.error('Failed to decode JWT', error);
    return null;
  }
};

export interface PasswordResetToken {
  email: string;
}

export const decodePasswordResetToken = (token: string): PasswordResetToken | null => {
  const decodedToken = safeDecodeJwt(token);
  if (decodedToken === null) {
    return null;
  }

  if (
    !('exp' in decodedToken)
    || !('iss' in decodedToken)
    || !('email' in decodedToken)
    || !('scope' in decodedToken)
  ) {
    return null;
  }

  if (decodedToken.exp < Date.now() / 1000) {
    return null;
  }

  if (decodedToken.scope !== 'password-reset') {
    return null;
  }

  if (decodedToken.iss !== 'directus') {
    return null;
  }

  if (typeof decodedToken.email !== 'string') {
    return null;
  }

  return {
    email: decodedToken.email,
  }
}