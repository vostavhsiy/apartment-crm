import { paginate, PaginationQueryDto } from "@apartment-crm/helpers";
import { SortOrder, WebSocketEvents } from "@apartment-crm/types";
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
            OR: [
              {
                name: {
                  contains: paginationQuery.search || "",
                  mode: "insensitive",
                },
              },
              {
                phone: {
                  contains: paginationQuery.search || "",
                  mode: "insensitive",
                },
              },
            ],
          },
          orderBy: {
            name:
              paginationQuery.sortOrder === SortOrder.ALPHABET
                ? "asc"
                : undefined,
          },
          include: ClientIncludeConfig,
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
        const collectionClient = await this.dbService.collectionClient.create({
          data: {
            clientId,
            collectionId,
          },
          include: {
            collection: true,
            client: true,
          },
        });
        return collectionClient;
      } else {
        await this.dbService.collectionClient.deleteMany({
          where: {
            clientId,
            collectionId,
          },
        });
        return true;
      }
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
            title: `Клиенту понравился объект "${apartmentClientRelation.apartment.title}"`,
            body: `Клиенту "${client.name}" понравился объект "${apartmentClientRelation.apartment.title}"`,
            link: `${CLIENT_URL}/ap/${apartmentId}`,
          });
          this.webSocketsGateway.sendToUser(userId, WebSocketEvents.MESSAGE, {
            message: `Клиенту "${client.name}" понравился объект "${apartmentClientRelation.apartment.title}"`,
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
        ? "Не удалось отметить объект!"
        : "Не удалось удалить объект из отмеченных!";
      throw new BadRequestException(message);
    }
  }

  async seeApartment(clientId: string, apartmentId: string) {
    try {
      const view = await this.dbService.clientApartmentView.create({
        data: {
          clientId,
          apartmentId,
          seen: true,
        },
      });
      return view;
    } catch (error) {
      throw new BadRequestException("Не удалось добавить просмотр объекту!");
    }
  }

  async remove(clientId: string, userId: string) {
    try {
      const client = await this.dbService.client.delete({
        where: { id: clientId, userId },
        include: ClientIncludeConfig,
      });
      return client;
    } catch (error) {
      throw new BadRequestException("Не удалось удалить клиента!");
    }
  }
}
