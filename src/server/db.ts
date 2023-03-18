import mongoose from 'mongoose';

export interface Claims {
  content: string[],
  web: string[],
}

export interface Group {
  name: string,
  title: string,
  inviteToken?: string,
  claims: Claims,
}

export const groupSchema = new mongoose.Schema<Group>({
  name: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  inviteToken: { type: String, unique: true },
  claims: { type: { content: [String], web: [String] }, required: true },
});

export const GroupModel = mongoose.model<Group>('Group', groupSchema);

export interface GeneralUser {
  name: string,
  avatarUrl: string,
  groups: Group[],
}

export interface User extends GeneralUser {
  login: string,
  email?: string,
  password?: string,
  appToken: string,
}

export const userSchema = new mongoose.Schema<User>({
  login: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String },
  password: { type: String },
  appToken: { type: String, required: true },
  avatarUrl: { type: String, required: true },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
});

export const UserModel = mongoose.model<User>('User', userSchema);

const appendGroup = async (user: GeneralUser, groupName: string): Promise<void> => {
  const group = await GroupModel.findOne({ name: groupName });
  if (group !== null) {
    user.groups.push(group.toObject());
  }
};

export const getAccount = async (login: string | null): Promise<{
  user: GeneralUser,
  claims: Claims,
}> => {
  let user: GeneralUser | null = null;
  if (login !== null) {
    const dbUser = await UserModel.findOne({ login });
    if (dbUser !== null) {
      await dbUser.populate('groups');
      user = dbUser.toObject();
      //TODO remove hardcoded name
      await appendGroup(user, 'Everyone');
    }
  }
  if (user === null) {
    //TODO remove hardcoded values
    user = {
      name: 'Nepřihlášený uživatel',
      avatarUrl: 'https://www.gravatar.com/avata',
      groups: [],
    };
  }

  //TODO remove hardcoded name
  await appendGroup(user, 'Public');

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
