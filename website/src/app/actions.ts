'use server';

import { revalidatePath } from "next/cache";
import { addToGroup } from "../lib/directus";

export const addToGroupAction = async (userId: string, groupId: string) => {
  addToGroup(userId, groupId);
  revalidatePath(`/pozvanky/${groupId}`);
};
