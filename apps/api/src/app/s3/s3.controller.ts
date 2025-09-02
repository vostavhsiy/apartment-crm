import { S3BucketFolders } from "@apartment-crm/types";
import {
  Body,
  Controller,
  Delete,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";

import { Auth } from "../auth/decorators/auth.decorator";
import { imageFileFilter } from "./filters/s3-image.filter";
import { S3Service } from "./s3.service";

@Controller("s3")
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Auth()
  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file", {
      fileFilter: imageFileFilter,
    }),
  )
  async uploadFile(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
    @Body("folder") folder?: S3BucketFolders,
  ) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    return this.s3Service.uploadFile(file, userId, folder);
  }

  @Auth()
  @Post("upload-multiple")
  @UseInterceptors(
    FilesInterceptor("files", 15, {
      fileFilter: imageFileFilter,
    }),
  )
  async uploadFiles(
    @Req() req: any,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body("folder") folder?: S3BucketFolders,
  ) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    return this.s3Service.uploadFiles(files, userId, folder);
  }

  @Auth()
  @Delete("delete")
  async deleteFile(@Req() req: any, @Query("url") url: string) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    return this.s3Service.deleteFile(url, userId);
  }
}
