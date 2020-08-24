import {IComment} from '../interfaces/comment.interface';
import {Comments} from '../models/comment.model';
import {Projects} from '../models/project.model';
import {Photos} from '../models/photo.model';
import {Users} from '../models/user.model';

import {CreateCommentDto} from '../dtos/comment.dto';
import HttpException from '../exceptions/HttpException';

export class CommentService {
  public comment = Comments;
  public project = Projects;
  public photo = Photos;
  public user = Users;

  public checkAuthority = async (userId: string, commentId: string) => {
    let comment;
    try {
      comment = await this.comment.findOne({_id: commentId})
    } catch (err) {
      throw new HttpException(500, 'db 오류 입니다.');
    }
    if (!comment) throw new HttpException(404, '댓글을 찾을 수 없습니다.');

    // @ts-ignore
    return String(userId) === String(comment.userId);
  };

  public createComment = async (clientData: CreateCommentDto, upperId: string, type: string) => {
    const comment = await this.comment.createComment(clientData);
    let result;
    try {
      // @ts-ignore
      result = await this[type].findOneAndUpdate({_id: upperId}, {$push: {commentIds: comment._id}}, {new: true});
    } catch (err) {
      this.comment.findOneAndDelete({_id: comment._id})
        .then(() => {
          console.log('Temp comment delete complete');
        })
        .catch(() => {
          console.log('Temp comment delete incomplete');
        });
      throw new HttpException(500, 'db 오류 입니다.');
    }

    if (!result) {
      this.comment.findOneAndDelete({_id: comment._id})
        .then(() => {
          console.log('Temp comment delete complete');
        })
        .catch(() => {
          console.log('Temp comment delete incomplete');
        });
      throw new HttpException(404,`${type} 을 찾을 수 없습니다.`);
    }
    return comment;
  };

  public updateComment = async (clientData: CreateCommentDto, commentId: string) => {
    let comment;
    try {
      comment = await this.comment.findOneAndUpdate({_id: commentId}, {content: clientData.content}, {new: true});
    } catch (err) {
      throw new HttpException(500, 'db 오류 입니다.');
    }
    if (!comment) throw new HttpException(404, '댓글을 찾을 수 없습니다.');
    return comment;
  };

  public likeComment = async (userId: string, commentId: string) => {
    let result;
    if (await this.user.findOne({_id: userId, likeComments: {$in: [commentId]}})) {

      await this.user.findOneAndUpdate({_id: userId}, {$pull: {likeComments: commentId}});
      try {
        result = await this.comment.findOneAndUpdate({_id: commentId}, {$inc: {likes: -1}}, {new: true});
      } catch (err) {
        try {
          await this.user.findOneAndUpdate({_id: userId}, {$push: {likeComments: commentId}});
        } catch (err) {
          throw new HttpException(500,'db 오류 입니다.');
        }
      }
      if (!result) {
        try {
          await this.user.findOneAndUpdate({_id: userId}, {$push: {likeComments: commentId}});
        } catch (err) {
          throw new HttpException(500,'db 오류 입니다.');
        }
      }
    } else {

      await this.user.findOneAndUpdate({_id: userId}, {$push: {likeComments: commentId}});
      try {
        result = await this.comment.findOneAndUpdate({_id: commentId}, {$inc: {likes: 1}}, {new: true});
      } catch (err) {
        try {
          await this.user.findOneAndUpdate({_id: userId}, {$pull: {likeComments: commentId}});
        } catch (err) {
          throw new HttpException(500,'db 오류 입니다.');
        }
      }
      if (!result) {
        try {
          await this.user.findOneAndUpdate({_id: userId}, {$pull: {likeComments: commentId}});
        } catch (err) {
          throw new HttpException(500,'db 오류 입니다.');
        }
      }
    }
    return result;
  };

  public deleteComment = async (commentId: string, type: string) => {
    let comment;
    try {
      comment = await this.comment.findOne({_id: commentId});
    } catch (err) {
      throw new HttpException(500, 'db 오류 입니다.');
    }
    if(!comment) throw new HttpException(404, '댓글을 찾을 수 없습니다.');
    try {
      await (async function deletion(Id: string, db: any) {
        let arr = await db.findOneAndDelete({_id: Id});
        if (arr.commentIds.length === 0) {
          return;
        }
        arr.commentIds.map((value: string) => {
          deletion(value, db);
        });
      })(commentId, this.comment);
    } catch (err) {
      throw new HttpException(500, 'db 오류 입니다.');
    }

    // @ts-ignore
    return await this[type].findOneAndUpdate({_id: comment.upperRef}, {$pull: {commentIds: comment._id}}, {new: true});
  };

}
