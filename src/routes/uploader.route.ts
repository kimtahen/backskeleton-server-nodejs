import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import { UploaderController } from '../controllers/uploader.controller';
import { ImageManager } from '../libs/aws/ImageManager';

export class UploaderRoute implements Route {
  public path = '/uploader';
  public router = Router();
  public controller = new UploaderController();
  public manager = new ImageManager();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/upload`, this.manager.uploadMiddleware, this.controller.upload);
    this.router.post(`${this.path}/delete`, this.controller.destroy);
  }
}
