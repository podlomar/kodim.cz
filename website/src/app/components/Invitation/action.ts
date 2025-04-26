'use server';

import { addToGroup } from "lib/directus";

export type InviteState = 'ready' | 'success' | 'error';

export const addToGroupAction = async (
  userId: string, groupId: string,
): Promise<InviteState> => {
  try {
    await addToGroup(userId, groupId);
  } catch (error) {
    console.error('Error adding to group:', error);
    return 'error';
  }

  return 'success';
};
