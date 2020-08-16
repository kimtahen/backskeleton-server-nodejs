import { CreatePhotoDto } from '../dtos/photo.dto';
import HttpException from '../exceptions/HttpException';
import { Photos } from '../models/photo.model';
import { IPhoto } from '../interfaces/photo.interface';
import { isEmptyObject } from '../utils/util';

export class PhotoService {
  public photos = Photos;

  /* CRUD */
  public async getAllPhotos(): Promise<IPhoto[]> {
    const photos: IPhoto[] = await this.photos.find();
    return photos;
  }

  public async getPhotoById(photoId: string): Promise<IPhoto> {
    const photo: IPhoto = await this.photos.findById(photoId);
    if (!photo) throw new HttpException(404, '해당 사진자료를 찾을 수 없습니다.');
    return photo;
  }

  public async createPhoto(data: CreatePhotoDto): Promise<IPhoto> {
    if (isEmptyObject(data)) throw new HttpException(400, '등록할 사진정보를 입력해야 합니다.');

    const photo: IPhoto = await this.photos.createPhoto(data);
    return photo;
  }

  public async updatePhoto(photoId: string, data: CreatePhotoDto): Promise<IPhoto> {
    if (isEmptyObject(data)) throw new HttpException(400, '수정할 사진정보를 입력해야 합니다.');
    const updatedPhoto: IPhoto = await this.photos.findOneAndUpdate({ _id: photoId }, data);
    return updatedPhoto;
  }

  public async destroyPhoto(photoId: string): Promise<IPhoto> {
    const photo: IPhoto = await this.photos.findOneAndDelete({ _id: photoId });
    return photo;
  }
}
