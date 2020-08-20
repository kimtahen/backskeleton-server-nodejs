import {CommentService} from '../services/comment.service';
import {Request, Response, NextFunction} from 'express';

export class CommentController {
  public service = new CommentService();

  public createComment = async (req: Request, res: Response, next: NextFunction) => {
    const type = req.params.type;
    const Id = req.params.Id;
    let document = req.body;
    let result;
    if (!req.user) {
      return res.status(401).json({message: 'Unauthorized'});
    }

    // @ts-ignore
    document.userId = req.user._id;

    if (type === 'project') {
      result = await this.service.createProjectComment(document, Id);
    } else if (type === 'photo') {
      result = await this.service.createPhotoComment(document, Id);
    } else if (type === "comment") {
      result = await this.service.createLowerComment(document, Id);
    } else {
      return res.status(400).json({message: 'Undefined type'});
    }

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
      return res.status(401).json({messsage: 'Unauthorized'});
    }
    if (checkValid === null){
      return res.status(404).json({message: 'Not Found'});
    }

    let result;
    try {
      result = await this.service.updateComment(document, commentId);
    } catch (err) {
      return res.status(500).json({message:  'Update comment failed'});
    }
    console.log(result);
    return res.status(200).json({data: result});
  }

  public deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    const type = req.params.type;
  }

}
