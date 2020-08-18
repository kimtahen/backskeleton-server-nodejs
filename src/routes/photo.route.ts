import { Router } from 'express';
import { PhotoController } from '../controllers/photo.controller';
import { CreatePhotoDto } from '../dtos/photo.dto';
import Route from '../interfaces/routes.interface';
import validation from '../middlewares/validation.middleware';

export class PhotoRoute implements Route {
  public path = '/photo';
  public router = Router();
  public controller = new PhotoController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.controller.getPhotos);
    this.router.get(`${this.path}/:photoId`, this.controller.getPhotoById);
    this.router.post(`${this.path}/`, validation(CreatePhotoDto), this.controller.createPhoto);
    this.router.put(`${this.path}/:photoId`, validation(CreatePhotoDto, true), this.controller.updatePhoto);
    this.router.delete(`${this.path}/:photoId`, this.controller.destroyPhoto);
  }
}
