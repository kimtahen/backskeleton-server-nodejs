import {Schema, Model, model} from 'mongoose';
import {IComment} from '../interfaces/comment.interface';
import {CreateCommentDto} from '../dtos/comment.dto';

export interface Comment extends IComment {
  /* instance methods */
}

export interface CommentModel extends Model<Comment> {
  createComment(clientData: CreateCommentDto) :Promise<IComment>;
}

const CommentSchema: Schema = new Schema({
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment',
    },
  ],
  upperRef: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

CommentSchema.statics.createComment = async (clientData: CreateCommentDto): Promise<IComment> => {
  const comment: IComment = new Comments({
    userId: clientData.userId,
    upperRef: clientData.upperRef,
    content: clientData.content,
  });
  return await comment.save();
};

export const Comments = model<Comment, CommentModel>('comment', CommentSchema);
