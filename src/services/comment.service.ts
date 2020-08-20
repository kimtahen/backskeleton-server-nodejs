import {IComment} from '../interfaces/comment.interface';
import {Comments} from '../models/comment.model';
import {Projects} from '../models/project.model';
import {Photos} from '../models/photo.model';

import {CreateCommentDto} from '../dtos/comment.dto';

export class CommentService {
  public comment = Comments;
  public project = Projects;
  public photo = Photos;

  public checkAuthority = async (userId: string, commentId: string) => {
    const comment = await this.comment.findOne({_id: commentId})
      .catch(()=>{
        return null;
      });
    // @ts-ignore
    return String(userId) === String(comment.userId);
  }

  public createProjectComment = async (clientData: CreateCommentDto, projectId: string) => {
    const comment = await this.comment.createComment(clientData);
    const project = await this.project.findOneAndUpdate({_id: projectId}, {$push: {comments: comment._id}}, {new: true})
      // .populate('author')
      // .populate('comments')
      // .populate({path:'comments',populate:{path:'userId'}})
      // .populate({path:'comments',populate:{path:'lowerCommentId'}})
      // .populate({path:'comments',populate:{path:'lowerCommentId',populate:{path:'userId'}}})
      // .sort({date: 1})
      .catch((err)=>{
        this.comment.findOneAndDelete({_id: comment._id})
          .then(()=>{ console.log('Temp comment delete complete'); })
          .catch(()=>{ console.log('Temp comment delete incomplete'); });
        return null;
      });

    return comment;
  };

  public createPhotoComment = async (clientData: CreateCommentDto, projectId: string) => {

  }

  public createLowerComment = async (clientData: CreateCommentDto, commentId: string) => {
    const comment = await this.comment.createComment(clientData);
    const upperComment = await this.comment.findOneAndUpdate({_id: commentId}, {$push: {lowerCommentId: comment._id}},{new:true})
      // .populate('userId')
      // .populate('lowerCommentId')
      // .populate({path: 'lowerCommentId', populate:{path: 'userId'}})
      // .sort({date:1})
      .catch((err)=>{
        this.comment.findOneAndDelete({_id: comment._id})
          .then(()=>{ console.log('Temp comment delete complete'); })
          .catch(()=>{ console.log('Temp comment delete incomplete'); });
        return null;
      });
    return comment;
  };

  public updateComment = async (clientData: CreateCommentDto, commentId: string) => {
    const comment = await this.comment.findOneAndUpdate({_id: commentId}, {content: clientData.content},{new:true});
    return comment;
  }

}
