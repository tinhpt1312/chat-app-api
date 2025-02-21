import axios from 'axios';
import { AwsS3Service } from '../aws-s3.service';
import { S3_RESPONSE } from 'src/types/s3.type';

export const downloadAndUploadAvatar = async (
  avatarUrl: string,
  awsS3Service: AwsS3Service,
): Promise<string> => {
  try {
    const response = await axios.get(avatarUrl, {
      responseType: 'arraybuffer',
    });

    const contentType = response.headers['content-type'];
    const extension = contentType.split('/')[1] || 'jpg';
    const fileName = `${Date.now()}.${extension}`;

    const presignedUrl = await awsS3Service.generateUploadUrl({
      key: fileName,
      folderName: 'avatars',
      contentType,
    });

    const uploadResponse = await axios.put(presignedUrl, response.data, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': response.data.length,
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });

    if (uploadResponse.status !== 200) {
      console.error(
        S3_RESPONSE.FAIL_UPLOAD_AVATAR_CODE,
        S3_RESPONSE.FAIL_UPLOAD_AVATAR_MESSAGE,
      );

      return avatarUrl;
    }

    return fileName;
  } catch (error) {
    console.error(
      'Error uploading avatar:',
      error.response?.data || error.message,
    );

    return avatarUrl;
  }
};
