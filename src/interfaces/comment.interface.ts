import { Document } from 'mongoose';

export interface IComment extends Document {
  lowerCommentId?: string[];
  date?: string;
  userId: string;
  content: string;
  likes: number;
}
