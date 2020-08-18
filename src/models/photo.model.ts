import { Schema, Model, model } from 'mongoose';
import { IPhoto } from '../interfaces/photo.interface';
import { CreatePhotoDto } from '../dtos/photo.dto';

export interface Photo extends IPhoto {
  /* instance methods */
}

export interface PhotoModel extends Model<Photo> {
  /* static methods */
  createPhoto(data: CreatePhotoDto): Promise<IPhoto>;
}

const PhotoSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  instagramId: {
    type: String,
  },
  titleImageName: {
    type: String,
  },
  detailImageNames: [
    {
      type: String,
    },
  ],
  likes: {
    type: Number,
    default: 0,
  },
  bookmarks: {
    type: Number,
    default: 0,
  },
  commentIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment',
    },
  ],
});

PhotoSchema.statics.createPhoto = function (data: CreatePhotoDto) {
  const photo: IPhoto = new this(data);
  return photo.save();
};

export const Photos = model<Photo, PhotoModel>('photo', PhotoSchema);
