import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { HttpException, Injectable } from '@nestjs/common';
import { ENV } from 'src/config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3_RESPONSE } from 'src/types/s3.type';

@Injectable()
export class AwsS3Service {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: ENV.AWS.REGION,
      credentials: {
        accessKeyId: ENV.AWS.ACCESS_KEY_ID,
        secretAccessKey: ENV.AWS.SECRET_ACCESS_KEY,
      },
    });
  }

  async generateUploadUrl({
    key,
    folderName,
    contentType,
  }: {
    key: string;
    folderName: string;
    contentType?: string;
  }): Promise<string> {
    const fullKey = `${folderName}/${key}`;

    const command = new PutObjectCommand({
      Bucket: ENV.AWS.BUCKET_NAME,
      Key: fullKey,
      ContentType: contentType,
    });

    try {
      return await getSignedUrl(this.s3Client, command, {
        expiresIn: Number(ENV.AWS.S3_PRESIGNED_URL_EXPIRATION) || 3600,
      });
    } catch (error) {
      console.log('Error generating presigned URL:', error);
      throw new HttpException(
        S3_RESPONSE.FAIL_UPLOAD_MESSAGE,
        S3_RESPONSE.FAIL_UPLOAD_CODE,
      );
    }
  }

  async DeleteObjectCommand(key: string, projectFolder: string) {
    const command = new DeleteObjectCommand({
      Bucket: ENV.AWS.BUCKET_NAME,
      Key: `${projectFolder}/${key}`,
    });

    try {
      return this.s3Client.send(command);
    } catch {
      throw new HttpException(
        S3_RESPONSE.FAIL_DELETED_MESSAGE,
        S3_RESPONSE.FAIL_DELETED_CODE,
      );
    }
  }
}
