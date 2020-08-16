import { NextFunction, Request, Response } from 'express';
import { CreatePhotoDto } from '../dtos/photo.dto';
import { IPhoto } from '../interfaces/photo.interface';
import { PhotoService } from '../services/photo.service';

export class PhotoController {
  public service = new PhotoService();

  /* CRUD */
  public getPhotos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const photos: IPhoto[] = await this.service.getAllPhotos();
      res.status(200).json({ data: photos, message: 'ok' });
    } catch (err) {
      next(err);
    }
  };

  public getPhotoById = async (req: Request, res: Response, next: NextFunction) => {
    const photoId: string = req.params.photoId;
    try {
      const photo: IPhoto = await this.service.getPhotoById(photoId);
      res.status(200).json({ data: photo, message: 'ok' });
    } catch (err) {
      next(err);
    }
  };

  public createPhoto = async (req: Request, res: Response, next: NextFunction) => {
    const data: CreatePhotoDto = req.body;
    try {
      const photo: IPhoto = await this.service.createPhoto(data);
      res.status(201).json({ data: photo, message: '사진이 등록되었습니다.' });
    } catch (err) {
      next(err);
    }
  };

  public updatePhoto = async (req: Request, res: Response, next: NextFunction) => {
    const photoId: string = req.params.photoId;
    const data: CreatePhotoDto = req.body;
    try {
      const updatedPhoto: IPhoto = await this.service.updatePhoto(photoId, data);
      res.status(200).json({ data: updatedPhoto, message: '사진정보가 수정되었습니다.' });
    } catch (err) {
      next(err);
    }
  };

  public destroyPhoto = async (req: Request, res: Response, next: NextFunction) => {
    const photoId: string = req.params.photoId;
    try {
      const photo: IPhoto = await this.service.destroyPhoto(photoId);
      res.status(203).json({ data: photo, message: '사진정보가 삭제되었습니다.' });
    } catch (err) {
      next(err);
    }
  };
}
