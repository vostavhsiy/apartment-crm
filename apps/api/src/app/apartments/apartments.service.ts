import { paginate, PaginationQueryDto } from "@apartment-crm/helpers";
import {
  GetApartmentInfoFromAiResponse,
  SortOrder,
} from "@apartment-crm/types";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { Apartment, Prisma } from "@prisma/client";
import axios from "axios";
import { type Cache } from "cache-manager";

import { FilesService } from "../files/files.service";
import { AiService } from "./../ai/ai.service";
import { DbService } from "./../db/db.service";
import { ApartmentIncludeConfig } from "./apartments.config";
import { SCRAPER_API_KEY } from "./apartments.constants";
import { CreateApartmentDto } from "./dto/create-apartment.dto";
import { UpdateApartmentDto } from "./dto/update-apartment.dto";

@Injectable()
export class ApartmentsService {
  private logger = new Logger(ApartmentsService.name, { timestamp: true });

  constructor(
    private dbService: DbService,
    private filesService: FilesService,
    private aiService: AiService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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

  async findForUser(userId: string, paginationQuery: PaginationQueryDto) {
    try {
      const data = await paginate<Apartment, Prisma.ApartmentFindManyArgs>(
        this.dbService.apartment,
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
          include: ApartmentIncludeConfig,
        },
      );
      return data;
    } catch (error) {
      throw new NotFoundException("Квартиры не найдены!");
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
    updateApartmentDto: UpdateApartmentDto,
    isAdmin: boolean = false,
  ) {
    try {
      const apartment = await this.dbService.$transaction(async (prisma) => {
        const { files, features, ...dto } = updateApartmentDto;
        const apartment = await prisma.apartment.update({
          where: { id: apartmentId, userId: isAdmin ? undefined : userId },
          data: dto,
        });
        if (!apartment) throw new Error();
        await this.filesService.removeFromApartment(
          apartment.id,
          userId,
          prisma,
          files,
        );
        if (files?.length) {
          for (let index = 0; index < files.length; index++) {
            const file = files[index];
            if (!file) throw new Error();
            await this.filesService.create(
              userId,
              {
                apartmentId: apartment.id,
                file,
                order: index,
              },
              prisma,
            );
          }
        }
        await prisma.feature.deleteMany({
          where: { apartmentId: apartment.id },
        });
        if (features?.length) {
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
      const apartment = await this.dbService.$transaction(async (prisma) => {
        await this.filesService.removeFromApartment(
          apartmentId,
          userId,
          prisma,
        );
        await prisma.feature.deleteMany({
          where: { apartmentId },
        });
        const apartment = await prisma.apartment.delete({
          where: { id: apartmentId, userId: isAdmin ? undefined : userId },
          include: { files: true },
        });
        return apartment;
      });
      return apartment;
    } catch (error) {
      throw new BadRequestException("Не удалось удалить квартиру!");
    }
  }

  async getApartmentInfoFromAi(
    url: string,
  ): Promise<GetApartmentInfoFromAiResponse> {
    try {
      const cachedApartmentInfo: string | undefined =
        await this.cacheManager.get(url);

      if (cachedApartmentInfo) {
        try {
          return JSON.parse(cachedApartmentInfo);
        } catch (error) {}
      }
      const urlPageBlob = await this.getPageHtml(url);

      if (!urlPageBlob) throw new Error();
      const apartmentInfo = await this.aiService.ask(
        [
          {
            type: "text",
            text: "Извлеки информацию о жилье из текста:\n" + urlPageBlob,
          },
        ],
        `Ты - парсер, тебе нужно извлечь информацию о жилье - title (Название, которое указано в тексте), subtitle (Дополнительная информация в тексте к названию), description (Описание из текста, приведенное к виду ht,html разметки для rich editor - обязательно несколько абзацев текста,если возможно, с маркированным списком), address (Адрес из текста), price (Цена квартиры из текста, сразу с валютой, в формате - <цена> <валюта>), features (Характеристики квартиры, вернуть в формате массива объектов {name: <Название характеристики>, value:<Значение характеристики>}).
        Ты должен вернуть только JSON объект с указанными полями, чтобы с этим объектом можно было вызвать JSON.parse. Без каких-либо лишних символов и форматирования, ответ должен начинаться с { и заканчиваться на }.
        `,
      );

      if (!apartmentInfo) throw new Error();

      await this.cacheManager.set(
        url,
        JSON.stringify(apartmentInfo),
        7 * 24 * 60 * 60 * 1000,
      );
      return {
        title: apartmentInfo.title || "",
        subtitle: apartmentInfo.subtitle || "",
        description: apartmentInfo.description || "",
        address: apartmentInfo.address || "",
        price: apartmentInfo.price || "",
        features: apartmentInfo.features || [],
      };
    } catch (error) {
      throw new BadRequestException(
        "Не удалось получить информацию о квартире!",
      );
    }
  }

  private async getPageHtml(url: string) {
    try {
      const response = await axios.get<string>(
        `https://api.scraperapi.com/?api_key=${SCRAPER_API_KEY}&url=${encodeURIComponent(url)}&output_format=text`,
      );
      return response.data;
    } catch (error) {
      //@ts-ignore
      this.logger.error("Error parsing url HTML:", error.response.data);
      return null;
    }
  }
}
