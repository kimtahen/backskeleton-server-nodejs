import { Document } from 'mongoose';

export interface IComment extends Document {
  postId: string;
  userId: string;
  content: string;
  likes: number;
}
