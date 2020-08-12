import { Schema, Model, model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import { Cryptor } from '../libs/cryptor';

export interface User extends IUser {
  /* instance methods */
}

export interface UserModel extends Model<User> {
  /* static methods */
  createUser(email: string, name: string, hashedPassword: string): Promise<IUser>;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 0,
  },
  _type: {
    type: String,
    default: 0,
  },
});

UserSchema.statics.createUser = function (email: string, name: string, hashedPassword: string): Promise<IUser> {
  const user: IUser = new this({
    email: email,
    name: name,
    password: hashedPassword,
  });
  return user.save();
};

export const Users = model<User, UserModel>('user', UserSchema);
