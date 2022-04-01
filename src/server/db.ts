import mongoose from 'mongoose';

export interface Group {
  name: string,
  claims: string[],
}

export const groupSchema = new mongoose.Schema<Group>({
  name: { type: String, required: true, unique: true },
  claims: { type: [String], required: true },
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
