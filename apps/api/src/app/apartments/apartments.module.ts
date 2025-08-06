import { Module } from "@nestjs/common";

import { FilesService } from "../files/files.service";
import { S3Service } from "../s3/s3.service";
import { ApartmentsController } from "./apartments.controller";
import { ApartmentsService } from "./apartments.service";

@Module({
  controllers: [ApartmentsController],
  providers: [ApartmentsService, FilesService, S3Service],
})
export class ApartmentsModule {}
