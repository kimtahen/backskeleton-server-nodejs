import { NextFunction, Request, Response } from 'express';
import { AWSS3Module } from './AWSS3Module';
import * as multer from 'multer';
import * as multers3 from 'multer-s3';
import 'dotenv/config';
import HttpException from '../../exceptions/HttpException';

export class ImageManager {
  public s3 = new AWSS3Module().s3;
  public bucketPath = process.env.AWS_BUCKET_PATH;
  public bucketName = process.env.AWS_BUCKET_NAME;

  public async destroy(fileNames: string[]): Promise<any> {
    let objects = [] as any;
    for await (let filename of fileNames) {
      objects.push({ Key: `${this.bucketPath}` + filename });
    }

    const payload = {
      Bucket: this.bucketName,
      Delete: {
        Objects: objects,
      },
    };

    this.s3.deleteObjects(payload, function (err: any) {
      if (err) {
        throw new HttpException(400, 'S3 Bucket의 이미지를 삭제하는데 실패했습니다.');
      }
    });
  }

  private upload = multer({
    storage: multers3({
      s3: this.s3,
      bucket: `${this.bucketName}/${this.bucketPath}`,
      key: function (req, file, callback) {
        callback(null, file.originalname);
      },
    }),
  }).array('images');

  public uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
    this.upload(req, res, function (err: any) {
      if (err) {
        throw new HttpException(400, 'AWS S3 업로드 실패했습니다.');
      }
      next();
    });
  };
}
