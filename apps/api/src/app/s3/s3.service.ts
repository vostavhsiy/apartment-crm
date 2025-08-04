import { S3BucketFolders } from "@apartment-crm/types";
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { S3 } from "aws-sdk";
import cuid from "cuid";
import * as path from "path";

import {
  S3_ACCESS_KEY,
  S3_BUCKET_NAME,
  S3_ENDPOINT,
  S3_FORCE_PATH_STYLE,
  S3_REGION,
  S3_SECRET_KEY,
} from "./s3.constants";

@Injectable()
export class S3Service {
  private readonly s3: S3;
  private readonly bucket!: string;

  constructor() {
    this.bucket = S3_BUCKET_NAME;
    this.s3 = new S3({
      endpoint: S3_ENDPOINT,
      region: S3_REGION,
      credentials: {
        accessKeyId: S3_ACCESS_KEY,
        secretAccessKey: S3_SECRET_KEY,
      },
      s3ForcePathStyle: S3_FORCE_PATH_STYLE,
      signatureVersion: "v4",
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    userId: string,
    folder: S3BucketFolders = S3BucketFolders.PUBLIC,
  ) {
    try {
      const ext = path.extname(file.originalname);
      const id = cuid();
      if (!id || !ext) {
        return null;
      }
      const key = `${folder}/${userId}:${cuid()}${ext}`;

      const result = await this.s3
        .upload({
          Bucket: this.bucket,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise();

      return { url: result.Location, key };
    } catch (error) {
      throw new BadRequestException("Ошибка при загрузке файла!");
    }
  }

  async deleteFile(url: string, userId: string) {
    try {
      const baseUrl = `${this.s3.endpoint.href}${this.bucket}/`;

      if (!url.startsWith(baseUrl)) {
        return null;
      }

      const key = decodeURIComponent(url.replace(baseUrl, ""));
      const keyUserId = key.split("/")?.[1].split(":")?.[0];

      if (keyUserId !== userId) {
        throw new UnauthorizedException();
      }

      await this.s3.deleteObject({ Bucket: this.bucket, Key: key }).promise();
      return { ok: true };
    } catch (error) {
      throw new BadRequestException("Ошибка при удалении файла!");
    }
  }
}
