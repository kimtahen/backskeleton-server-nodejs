import { NextFunction, Request, Response } from 'express';
import { ImageManager } from '../libs/aws/ImageManager';

export class UploaderController {
  public manager = new ImageManager();

  public upload = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ message: 'AWS S3 업로드 성공' });
    } catch (err) {
      next(err);
    }
  };

  public destroy = async (req: Request, res: Response, next: NextFunction) => {
    const fileNames: string[] = req.body.iamges;
    try {
      const destroy = await this.manager.destroy(fileNames);
      res.status(200).json({ data: destroy, message: 'AWS S3 이미지 삭제 성공' });
    } catch (err) {
      next(err);
    }
  };
}
