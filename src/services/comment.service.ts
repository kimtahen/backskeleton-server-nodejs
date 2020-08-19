import {IComment} from '../interfaces/comment.interface';
import {Comments} from '../models/comment.model';
import {Projects} from '../models/project.model';
import {Photos} from '../models/photo.model';

import {CreateCommentDto} from '../dtos/comment.dto';

export class CommentService {
  public comment = Comments;
  public project = Projects;
  public photo = Photos;

  public createProjectComment = async (clientData: CreateCommentDto, projectId: string) => {
    const comment = await this.comment.createComment(clientData);
    const project = await this.project.findOneAndUpdate({_id: projectId}, {$push: {comments: comment._id}}, {new: true})
      .populate('author')
      .populate('comments')
      .populate({path: 'comments', populate: {path: 'userId'}})
      .populate({path: 'comments', populate: {path: 'lowerCommentId'}})
      .sort({date: 1});
    return project;
  };

  public createLowerComment = async (clientData: CreateCommentDto, commentId: string) => {
    const comment = await this.comment.createComment(clientData);
    const upperComment = await this.comment.findOneAndUpdate({_id: commentId}, {$push: {lowerCommentId: comment._id}},{new:true})
      .populate('lowerCommentId');
    return upperComment;
  };
}
