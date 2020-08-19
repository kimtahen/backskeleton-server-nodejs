import { Document } from 'mongoose';

export interface IComment extends Document {
  lowerCommentId?: string[];
  userId: string;
  content: string;
  likes: number;
}
