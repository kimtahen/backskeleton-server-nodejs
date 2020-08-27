import { Document } from 'mongoose';

export interface IComment extends Document {
  commentIds?: string[];
  upperRef?: string;
  date?: string;
  userId: string;
  content: string;
  likes: number;
  likeUserIds: string[];
}
