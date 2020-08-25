import * as aws from 'aws-sdk';
import 'dotenv/config';

export class AWSS3Module {
  public s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
}
