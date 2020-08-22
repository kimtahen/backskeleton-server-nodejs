import {CommentService} from '../services/comment.service';
import {Request, Response, NextFunction} from 'express';
import HttpException from '../exceptions/HttpException';

export class CommentController {
  public service = new CommentService();

  public createComment = async (req: Request, res: Response, next: NextFunction) => {
    const type = req.params.type;
    const id = req.params.id;
    let document = req.body;

    if (!req.user) {
      return next(new HttpException(401,'로그인 하세요!'));
    }

    // @ts-ignore
    document.userId = req.user._id;
    document.upperRef = id;
    if (!(type === 'project' || type === 'photo' || type === 'comment')){
      return next(new HttpException(400, '타입은 project | photo | comment 이중에 하나여야 합니다.'));
    }
    try{
      const comment = await this.service.createComment(document, id, type);
      return res.status(200).json({data: comment});
    } catch (err) {
      return next(err);
    }

  };

  public updateComment = async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.commentId;
    let document = req.body;
    if (!req.user) {
      return next(new HttpException(401, '로그인 하세요!'));

    }
    // @ts-ignore
    document.userId = req.user._id;
    let checkValid;
    try {
      // @ts-ignore
      checkValid = await this.service.checkAuthority(req.user._id,commentId)
    } catch (err) {
      return next(err);
    }
    if (!checkValid) return next(new HttpException(401, '권한이 없습니다.'));

    let result;
    try {
      result = await this.service.updateComment(document, commentId);
      return res.status(200).json({data: result});
    } catch (err) {
      return next(err);
    }
  }

  public likeComment = async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.commentId;
    if (!req.user) return next(new HttpException(401, '로그인 하세요!'));

    // @ts-ignore
    const userId = req.user._id;

    let result;
    try {
      result = await this.service.likeComment(userId, commentId);
    } catch (err) {
      return next(err);
    }

    return res.status(200).json({data:result});

  }

  public deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    const type = req.params.type;
    const id = req.params.id;
    if(!req.user) return next(new HttpException(401, '로그인 하세요!'));

    let checkValid;
    try {
      // @ts-ignore
      checkValid = await this.service.checkAuthority(req.user._id, id);
    } catch (err) {
      return next(err);
    }
    if (!checkValid) return next(new HttpException(401, '권한이 없습니다.'));

    let result;
    try {
      result = await this.service.deleteComment(id, type);
    } catch (err) {
      return next(err);
    }
    return res.status(200).json({data: result});
  }

}
