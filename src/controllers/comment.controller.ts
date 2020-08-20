import {CommentService} from '../services/comment.service';
import {Request, Response, NextFunction} from 'express';

export class CommentController {
  public service = new CommentService();

  public createComment = async (req: Request, res: Response, next: NextFunction) => {
    const type = req.params.type;
    const id = req.params.id;
    let document = req.body;
    let result;
    if (!req.user) {
      return res.status(401).json({message: 'Unauthorized'});
    }

    // @ts-ignore
    document.userId = req.user._id;
    document.upperRef = id;
    if (!(type === 'project' || type === 'photo' || type === 'comment')){
      return res.status(400).json({message: 'Undefined type'});
    }
    result = await this.service.createComment(document, id, type);

    if(!result){
      return res.status(404).json({message: 'Not Found'});
    }
    return res.status(200).json({result});
  };

  public updateComment = async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.commentId;
    let document = req.body;
    if (!req.user) {
      return res.status(401).json({message: 'Unauthorized'});
    }
    // @ts-ignore
    document.userId = req.user._id;
    // @ts-ignore
    let checkValid = await this.service.checkAuthority(req.user._id,commentId)
    if (checkValid === false){
      return res.status(401).json({message: 'Unauthorized'});
    }
    if (checkValid === null){
      return res.status(404).json({message: 'Not Found'});
    }

    let result;
    try {
      result = await this.service.updateComment(document, commentId);
    } catch (err) {
      return res.status(500).json({message:  'Update process failed'});
    }
    return res.status(200).json({data: result});
  }

  public likeComment = async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.commentId;
    if (!req.user) {
      return res.status(401).json({message: 'Unauthorized'});
    }

  }

  public deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    const type = req.params.type;
    const id = req.params.id;
    if(!req.user){
      return res.status(401).json({message: 'Unauthorized'});
    }
    // @ts-ignore
    let checkValid = await this.service.checkAuthority(req.user._id,id);
    if (checkValid === false){
      return res.status(401).json({message: 'Unauthorized'});
    }
    if (checkValid === null){
      return res.status(404).json({message: 'Not Found'});
    }

    let result;
    try {
      result = await this.service.deleteComment(id, type);
    } catch (err) {
      console.log(err);
      return res.status(500).json({message: 'Delete process failed'});
    }
    return res.status(200).json({data: result});
  }

}
