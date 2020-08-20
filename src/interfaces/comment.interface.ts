import { Document } from 'mongoose';

export interface IComment extends Document {
  comments?: string[];
  upperRef?: string;
  date?: string;
  userId: string;
  content: string;
  likes: number;
}
