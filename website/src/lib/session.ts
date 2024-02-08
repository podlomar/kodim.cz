export interface SessionData {
  refreshToken: string;
  userId: string;
};

export const encryptSessionData = (data: SessionData): string => {
  return `${data.userId}:${data.refreshToken}`;
};

export const decryptSessionData = (encrypted: string): SessionData | null => {
  const [userId, refreshToken] = encrypted.split(':');
  if (userId === undefined || refreshToken === undefined) {
    return null;
  }

  if (userId === '' || refreshToken === '') {
    return null;
  }
  
  return {
    userId,
    refreshToken,
  };
};
