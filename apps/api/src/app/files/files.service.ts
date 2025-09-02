import { S3BucketFolders } from "@apartment-crm/types";
import { BadRequestException, Injectable } from "@nestjs/common";

import { TransactionContext } from "../db/db.types";
import { DbService } from "./../db/db.service";
import { S3Service } from "./../s3/s3.service";
import { CreateFileDto } from "./dto/create-file.dto";

@Injectable()
export class FilesService {
  constructor(
    private dbService: DbService,
    private s3Service: S3Service,
  ) {}

  async create(
    userId: string,
    createFileDto: CreateFileDto,
    tx?: TransactionContext,
  ) {
    const dbService = tx || this.dbService;
    try {
      if (!userId) throw new Error();
      if (typeof createFileDto.file !== "string") {
        const fileInfo = await this.s3Service.uploadFile(
          createFileDto.file,
          userId,
          S3BucketFolders.POST_IMAGES,
        );
        if (!fileInfo) throw new Error();
        const file = await dbService.file.create({
          data: {
            url: fileInfo.url,
            apartmentId: createFileDto.apartmentId,
            order: createFileDto.order,
          },
        });
        return file;
      }

      const file = await dbService.file.create({
        data: {
          url: createFileDto.file,
          apartmentId: createFileDto.apartmentId,
          order: createFileDto.order,
        },
      });
      return file;
    } catch (error) {
      throw new BadRequestException("Не удалось создать файл!");
    }
  }

  async removeFromApartment(
    apartmentId: string,
    userId: string,
    tx?: TransactionContext,
    ids?: string[],
  ) {
    const dbService = tx || this.dbService;
    try {
      const files = await dbService.file.findMany({
        where: { apartmentId, url: { notIn: ids || [] } },
      });
      for (let file of files) {
        await this.s3Service.deleteFile(file.url, userId);
      }
      const deletedFiles = await dbService.file.deleteMany({
        where: {
          apartmentId,
        },
      });
      return deletedFiles;
    } catch (error) {
      throw new BadRequestException("Не удалось удалить файлы!");
    }
  }
}
