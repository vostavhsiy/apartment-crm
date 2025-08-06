import { Module } from "@nestjs/common";

import { S3Service } from "../s3/s3.service";
import { FilesService } from "./files.service";

@Module({
  providers: [FilesService, S3Service],
})
export class FilesModule {}
