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
      .catch(() => {
        return null;
      });
    if (!comment) {
      return null;
    }
    // @ts-ignore
    return String(userId) === String(comment.userId);
  };

  public createComment = async (clientData: CreateCommentDto, upperId: string, type: string) => {
    const comment = await this.comment.createComment(clientData);
    // @ts-ignore
    const result = await this[type].findOneAndUpdate({_id: upperId}, {$push: {comments: comment._id}}, {new: true})
      // @ts-ignore
      .catch((err) => {
        this.comment.findOneAndDelete({_id: comment._id})
          .then(() => {
            console.log('Temp comment delete complete');
          })
          .catch(() => {
            console.log('Temp comment delete incomplete');
          });
        return null;
      });
    if (!result) {
      this.comment.findOneAndDelete({_id: comment._id})
        .then(() => {
          console.log('Temp comment delete complete');
        })
        .catch(() => {
          console.log('Temp comment delete incomplete');
        });
      return null;
    }
    return comment;
  };

  public updateComment = async (clientData: CreateCommentDto, commentId: string) => {
    const comment = await this.comment.findOneAndUpdate({_id: commentId}, {content: clientData.content}, {new: true});
    return comment;
  };

  public deleteComment = async (commentId: string, type: string) => {
    let comment;
    try {
      comment = await this.comment.findOne({_id: commentId});
    } catch(err) {
      throw err;
    }
    try {
      await (async function deletion(Id: string, db: any) {
        let arr = await db.findOneAndDelete({_id: Id});
        if (arr.comments.length === 0) {
          return;
        }
        arr.comments.map((value: string) => {
          deletion(value, db);
        });
      })(commentId, this.comment);
    } catch (err) {
      throw err;
    }

    // @ts-ignore
    return await this[type].findOneAndUpdate({_id: comment.upperRef}, {$pull: {comments: comment._id}}, {new: true});
  };
}
