import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  status: UserStatus;
  _type: UserType;
}

enum UserStatus {
  'inactive' = 0,
  'active' = 1,
}

enum UserType {
  'common' = 0,
  'admin' = 1,
  'superAdmin' = 2,
}
