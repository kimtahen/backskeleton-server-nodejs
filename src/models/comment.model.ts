import { Schema, Model, model } from 'mongoose';
import { IComment } from '../interfaces/comment.interface';

export interface Comment extends IComment {
  /* instance methods */
}

export interface CommentModel extends Model<Comment> {
  /* static methods */
}

const CommentSchema: Schema = new Schema({
  photoId: {
    type: Schema.Types.ObjectId,
    ref: 'photo',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

export const Comments = model<Comment, CommentModel>('comment', CommentSchema);
