import { paginate, PaginationQueryDto } from "@apartment-crm/helpers";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Apartment, Prisma } from "@prisma/client";

import { FilesService } from "../files/files.service";
import { DbService } from "./../db/db.service";
import { ApartmentIncludeConfig } from "./apartments.config";
import { CreateApartmentDto } from "./dto/create-apartment.dto";
import { UpdateApartmentDto } from "./dto/update-apartment.dto";

@Injectable()
export class ApartmentsService {
  constructor(
    private dbService: DbService,
    private filesService: FilesService,
  ) {}

  async create(
    userId: string,
    files: Express.Multer.File[],
    createApartmentDto: CreateApartmentDto,
  ) {
    try {
      const apartment = await this.dbService.$transaction(async (prisma) => {
        const { files: dtoFiles, features, ...dto } = createApartmentDto;
        const apartment = await prisma.apartment.create({
          data: {
            ...dto,
            userId,
          },
        });
        if (files?.length) {
          for (let index = 0; index < files.length; index++) {
            const file = files[index];
            if (!file) throw new Error();
            await this.filesService.create(
              userId,
              {
                apartmentId: apartment.id,
                file: files[index],
                order: index,
              },
              prisma,
            );
          }
        }
        if (features?.length && Array.isArray(features)) {
          await prisma.feature.createMany({
            data: features.map((feature) => ({
              name: feature.name,
              value: feature.value,
              apartmentId: apartment.id,
            })),
          });
        }
        return apartment;
      });
      return apartment;
    } catch (error) {
      throw new BadRequestException("Не удалось добавить квартиру!");
    }
  }

  async findForCollection(
    collectionId: string,
    paginationQuery: PaginationQueryDto,
  ) {
    try {
      const data = await paginate<Apartment, Prisma.ApartmentFindManyArgs>(
        this.dbService.apartment,
        paginationQuery,
        {
          where: {
            collectionsLinks: {
              some: {
                collectionId,
              },
            },
          },
          include: ApartmentIncludeConfig,
        },
      );
      return data;
    } catch (error) {
      throw new NotFoundException("Квартиры не найдены!");
    }
  }

  async findOne(id: string) {
    try {
      const apartment = await this.dbService.apartment.findUnique({
        where: { id },
        include: ApartmentIncludeConfig,
      });
      if (!apartment) throw new NotFoundException("Квартира не найдена!");
      return apartment;
    } catch (error) {
      throw new NotFoundException("Квартира не найдена!");
    }
  }

  async update(
    apartmentId: string,
    userId: string,
    files: Express.Multer.File[],
    updateApartmentDto: UpdateApartmentDto,
    isAdmin: boolean = false,
  ) {
    try {
      const apartment = await this.dbService.$transaction(async (prisma) => {
        const { files: dtoFiles, features, ...dto } = updateApartmentDto;
        const apartment = await prisma.apartment.update({
          where: { id: apartmentId, userId: isAdmin ? undefined : userId },
          data: dto,
        });
        if (!apartment) throw new Error();
        if (files?.length) {
          await this.filesService.removeFromApartment(
            apartment.id,
            userId,
            prisma,
          );
          for (let index = 0; index < files.length; index++) {
            const file = files[index];
            if (!file) throw new Error();
            await this.filesService.create(
              userId,
              {
                apartmentId: apartment.id,
                file: files[index],
                order: index,
              },
              prisma,
            );
          }
        }
        if (features?.length) {
          await prisma.feature.deleteMany({
            where: { apartmentId: apartment.id },
          });
          await prisma.feature.createMany({
            data: features.map((feature) => ({
              name: feature.name,
              value: feature.value,
              apartmentId: apartment.id,
            })),
          });
        }
        return apartment;
      });
      return apartment;
    } catch (error) {
      throw new BadRequestException("Не удалось обновить квартиру!");
    }
  }

  async toggleApartmentToCollection(
    apartmentId: string,
    collectionId: string,
    userId: string,
    connect?: boolean,
    order?: number,
    isAdmin: boolean = false,
  ) {
    try {
      const apartment = await this.dbService.apartment.findFirst({
        where: { id: apartmentId, userId: isAdmin ? undefined : userId },
      });
      if (!apartment) throw new Error();
      if (connect) {
        await this.dbService.apartmentCollection.create({
          data: {
            apartmentId,
            collectionId,
            order,
          },
        });
      } else {
        await this.dbService.apartmentCollection.deleteMany({
          where: {
            apartmentId,
            collectionId,
          },
        });
      }
      return apartment;
    } catch (error) {
      const message = connect
        ? "Не удалось добавить квартиру в подборку!"
        : "Не удалось удалить квартиру из подборки!";
      throw new BadRequestException(message);
    }
  }

  async remove(apartmentId: string, userId: string, isAdmin: boolean = false) {
    try {
      await this.filesService.removeFromApartment(apartmentId, userId);
      const apartment = await this.dbService.apartment.delete({
        where: { id: apartmentId, userId: isAdmin ? undefined : userId },
        include: { files: true },
      });
      return apartment;
    } catch (error) {
      console.error("Error removing apartment:", error);
      throw new BadRequestException("Не удалось удалить квартиру!");
    }
  }
}
