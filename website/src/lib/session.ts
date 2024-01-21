export interface SessionData {
  refreshToken: string;
  userId: string;
};

// const cipher = crypto.createCipheriv(
//   'aes-256-gcm',
//   process.env.SESSION_SECRET ?? '',
//   process.env.SESSION_IV ?? '',
// );

// const decipher = crypto.createDecipheriv(
//   'aes-256-gcm',
//   process.env.SESSION_SECRET ?? '',
//   process.env.SESSION_IV ?? '',
// );


export const encryptSessionData = (data: SessionData): string => {
  // const encrypted = Buffer.concat([
  //   cipher.update(`${data.userId}:${data.refreshToken}`, 'utf8'),
  //   cipher.final(),
  // ]);

  // return encrypted.toString('base64');

  return `${data.userId}:${data.refreshToken}`;
};

export const decryptSessionData = (encrypted: string): SessionData => {
  // const decrypted = Buffer.concat([
  //   decipher.update(encrypted, 'base64'),
  //   decipher.final(),
  // ]);

  // const [userId, refreshToken] = decrypted.toString('utf8').split(':');

  // return {
  //   userId,
  //   refreshToken,
  // };

  const [userId, refreshToken] = encrypted.split(':');
  return {
    userId,
    refreshToken,
  };
};
