import {
  paginate,
  PaginationQueryDto,
  SortOrder,
} from "@apartment-crm/helpers";
import { WebSocketEvents } from "@apartment-crm/types";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Client, Prisma } from "@prisma/client";

import { CLIENT_URL } from "../auth/auth.constants";
import { NotificationsService } from "../notifications/notifications.service";
import { WebsocketsGateway } from "../websockets/websockets.gateway";
import { DbService } from "./../db/db.service";
import { ClientIncludeConfig } from "./clients.config";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";

@Injectable()
export class ClientsService {
  constructor(
    private dbService: DbService,
    private webSocketsGateway: WebsocketsGateway,
    private notificationsService: NotificationsService,
  ) {}

  async create(userId: string, createClientDto: CreateClientDto) {
    try {
      const client = await this.dbService.client.create({
        data: { ...createClientDto, userId },
        include: ClientIncludeConfig,
      });
      return client;
    } catch (error) {
      throw new BadRequestException("Не удалось добавить клиента!");
    }
  }

  async findForUser(userId: string, paginationQuery: PaginationQueryDto) {
    try {
      const data = await paginate<Client, Prisma.ClientFindManyArgs>(
        this.dbService.client,
        paginationQuery,
        {
          where: {
            userId,
            name: {
              contains: paginationQuery.search || "",
              mode: "insensitive",
            },
          },
          orderBy: {
            name:
              paginationQuery.sortOrder === SortOrder.ALPHABET
                ? "asc"
                : undefined,
          },
        },
      );
      return data;
    } catch (error) {
      throw new BadRequestException("Не удалось получить клиентов!");
    }
  }

  async findOne(id: string, userId: string) {
    try {
      const client = await this.dbService.client.findUnique({
        where: { id, userId },
        include: ClientIncludeConfig,
      });
      return client;
    } catch (error) {
      throw new NotFoundException("Не удалось получить клиента!");
    }
  }

  async update(
    clientId: string,
    userId: string,
    updateClientDto: UpdateClientDto,
  ) {
    try {
      const client = await this.dbService.client.update({
        where: { id: clientId, userId },
        data: updateClientDto,
        include: ClientIncludeConfig,
      });
      return client;
    } catch (error) {
      throw new BadRequestException("Не удалось обновить клиента!");
    }
  }

  async toggleCollectionToClient(
    clientId: string,
    collectionId: string,
    userId: string,
    connect?: boolean,
  ) {
    try {
      const client = await this.dbService.client.findFirst({
        where: { id: clientId, userId },
      });
      if (!client) throw new Error();
      if (connect) {
        await this.dbService.collectionClient.create({
          data: {
            clientId,
            collectionId,
          },
        });
      } else {
        await this.dbService.collectionClient.deleteMany({
          where: {
            clientId,
            collectionId,
          },
        });
      }
      return client;
    } catch (error) {
      const message = connect
        ? "Не удалось добавить подборку клиенту!"
        : "Не удалось удалить подборку у клиента!";
      throw new BadRequestException(message);
    }
  }

  async toggleApartmentToClient(
    clientId: string,
    apartmentId: string,
    userId: string,
    connect?: boolean,
  ) {
    try {
      const client = await this.dbService.client.findFirst({
        where: { id: clientId, userId },
      });
      if (!client) throw new Error();
      if (connect) {
        const apartmentClientRelation =
          await this.dbService.apartmentClient.create({
            data: {
              apartmentId,
              clientId,
            },
            include: {
              apartment: true,
            },
          });
        try {
          await this.notificationsService.create(userId, {
            title: apartmentClientRelation.apartment.title,
            body: `Клиенту "${client.name}" понравилась квартира "${apartmentClientRelation.apartment.title}"`,
            link: `${CLIENT_URL}/ap/${apartmentId}`,
          });
          this.webSocketsGateway.sendToUser(userId, WebSocketEvents.MESSAGE, {
            message: `Клиенту "${client.name}" понравилась квартира "${apartmentClientRelation.apartment.title}"`,
          });
        } catch (error) {}
      } else {
        await this.dbService.apartmentClient.deleteMany({
          where: {
            clientId,
            apartmentId,
          },
        });
      }
      return client;
    } catch (error) {
      const message = connect
        ? "Не удалось отметить квартиру!"
        : "Не удалось удалить квартиру из отмеченных!";
      throw new BadRequestException(message);
    }
  }

  remove(clientId: string, userId: string) {
    try {
      const client = this.dbService.client.delete({
        where: { id: clientId, userId },
        include: ClientIncludeConfig,
      });
      return client;
    } catch (error) {
      throw new BadRequestException("Не удалось удалить клиента!");
    }
  }
}
