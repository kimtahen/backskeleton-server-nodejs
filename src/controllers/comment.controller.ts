import {CommentService} from '../services/comment.service';
import {Request, Response, NextFunction} from 'express';

export class CommentController {
  public service = new CommentService();

  public createComment = async (req: Request, res: Response, next: NextFunction) => {
    const type = req.params.type;
    const Id = req.params.Id;
    let document = req.body;
    let comment;
    if(!req.user) {
      return res.status(401).json({message: 'Unauthorized'});
    }

    // @ts-ignore
    document.userId = req.user._id;
    if (type === 'project'){
      comment = await this.service.createProjectComment(document, Id);
    } else if (type === 'photo'){

    } else if (type === "comment"){
      comment = await this.service.createLowerComment(document, Id);
    } else {
      return res.status(400).json({message:'Undefinded type'});
    }
    if(!comment){
      //delete comment document 기능 추가하기
      return res.status(404).json({message: 'Not Found'});
    }
    return res.status(200).json({comment});
  }

}
