import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  email: string;
  name: string;
  password: string;
  status: UserStatus;
  _type: UserType;
  likeProjects: string[];
  likePhotos: string[];
  likeComments: string[];
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
