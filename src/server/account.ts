import { Claims, User, UserModel } from './db';

export interface Account {
  user: User;
  claims: Claims;
}

export const getAccount = async (token: ParsedToken): Promise<Account | null> => {
  if (token.scp !== 'all') {
    return null;
  }

  const dbUser = await UserModel.findOne({ login: token.usr });
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

  return { user, claims };
};
