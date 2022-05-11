import mongoose from 'mongoose';

export interface Claims {
  content: string[],
  web: string[],
}

export interface Group {
  name: string,
  claims: Claims,
}

export const groupSchema = new mongoose.Schema<Group>({
  name: { type: String, required: true, unique: true },
  claims: { type: { content: [String], web: [String] }, required: true },
});

export const GroupModel = mongoose.model<Group>('Group', groupSchema);

export interface User {
  login: string;
  name: string,
  email?: string;
  avatarUrl: string,
  groups: Group[],
}

export const userSchema = new mongoose.Schema<User>({
  login: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String },
  avatarUrl: { type: String, required: true },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
});

export const UserModel = mongoose.model<User>('User', userSchema);

export const getAccount = async (login: string): Promise<null | {
  user: User,
  claims: Claims,
}> => {
  const dbUser = await UserModel.findOne({ login });
  if (dbUser === null) {
    return null;
  }
  await dbUser.populate('groups');
  const user = dbUser.toObject();
  const claims: Claims = user.groups.reduce(
    (acc: Claims, group): Claims => ({
      content: [...acc.content, ...group.claims.content],
      web: [...acc.web, ...group.claims.web],
    }),
    { content: [], web: [] },
  );
  return {
    user,
    claims,
  };
};
