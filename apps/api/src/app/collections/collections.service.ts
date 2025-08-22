import {
  paginate,
  PaginationQueryDto,
  SortOrder,
} from "@apartment-crm/helpers";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Collection, Prisma } from "@prisma/client";

import { DbService } from "./../db/db.service";
import { CollectionIncludeConfig } from "./collections.config";
import { CreateCollectionDto } from "./dto/create-collection.dto";
import { UpdateCollectionDto } from "./dto/update-collection.dto";

@Injectable()
export class CollectionsService {
  constructor(private dbService: DbService) {}

  async create(userId: string, createCollectionDto: CreateCollectionDto) {
    try {
      const collection = await this.dbService.collection.create({
        data: {
          ...createCollectionDto,
          userId,
        },
        include: CollectionIncludeConfig,
      });
      return collection;
    } catch (error) {
      throw new BadRequestException("Не удалось добавить подборку!");
    }
  }

  async findForUser(userId: string, paginationQuery: PaginationQueryDto) {
    try {
      const data = await paginate<Collection, Prisma.CollectionFindManyArgs>(
        this.dbService.collection,
        paginationQuery,
        {
          where: {
            userId,
            title: {
              contains: paginationQuery.search || "",
              mode: "insensitive",
            },
          },
          orderBy: {
            title:
              paginationQuery.sortOrder === SortOrder.ALPHABET
                ? "asc"
                : undefined,
          },
          include: CollectionIncludeConfig,
        },
      );
      return data;
    } catch (error) {
      throw new BadRequestException("Не удалось получить подборки!");
    }
  }

  async findOne(id: string) {
    try {
      const collection = await this.dbService.collection.findUnique({
        where: { id },
        include: CollectionIncludeConfig,
      });
      return collection;
    } catch (error) {
      throw new NotFoundException("Не удалось получить подборку!");
    }
  }

  async update(
    collectionId: string,
    userId: string,
    updateCollectionDto: UpdateCollectionDto,
    isAdmin?: boolean,
  ) {
    try {
      const collection = await this.dbService.collection.update({
        where: { id: collectionId, userId: isAdmin ? undefined : userId },
        data: updateCollectionDto,
        include: CollectionIncludeConfig,
      });
      return collection;
    } catch (error) {
      throw new BadRequestException("Не удалось обновить подборку!");
    }
  }

  async remove(collectionId: string, userId: string, isAdmin?: boolean) {
    try {
      const collection = await this.dbService.collection.delete({
        where: { id: collectionId, userId: isAdmin ? undefined : userId },
        include: CollectionIncludeConfig,
      });
      return collection;
    } catch (error) {
      throw new BadRequestException("Не удалось удалить подборку!");
    }
  }
}
