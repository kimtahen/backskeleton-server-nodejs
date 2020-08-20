import {Router} from 'express';
import {CommentController} from '../controllers/comment.controller';
import {CreateCommentDto} from '../dtos/comment.dto';
import Route from '../interfaces/routes.interface';
import validation from '../middlewares/validation.middleware';

export class CommentRoute implements Route{
  public path = `/comment`;
  public router = Router();
  public controller = new CommentController();
  constructor(){
    this.initializeRoutes();
  }
  private initializeRoutes(){
    this.router.post(`${this.path}/:type/:Id`,validation(CreateCommentDto),this.controller.createComment);
    this.router.put(`${this.path}/:commentId`,validation(CreateCommentDto),this.controller.updateComment);
    // this.router.delete(`${this.path}/:type/:commentId`,this.controller.deleteComment);
  }

}
