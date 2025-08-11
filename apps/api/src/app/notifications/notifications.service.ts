import { paginate, PaginationQueryDto } from "@apartment-crm/helpers";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Notification, Prisma } from "@prisma/client";

import { DbService } from "./../db/db.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { NotificationIncludeConfig } from "./notifications.config";

@Injectable()
export class NotificationsService {
  constructor(private dbService: DbService) {}

  async create(userId: string, createNotificationDto: CreateNotificationDto) {
    try {
      const notification = await this.dbService.notification.create({
        data: { ...createNotificationDto, userId },
        include: NotificationIncludeConfig,
      });
      return notification;
    } catch (error) {
      throw new BadRequestException("Не удалось создать уведомление!");
    }
  }

  async findForUser(userId: string, paginationQuery: PaginationQueryDto) {
    try {
      const data = await paginate<
        Notification,
        Prisma.NotificationFindManyArgs
      >(this.dbService.notification, paginationQuery, {
        where: {
          userId,
        },
      });
      return data;
    } catch (error) {
      throw new NotFoundException("Уведомления не найдены!");
    }
  }

  async remove(notificationId: string, userId: string) {
    try {
      const notification = await this.dbService.notification.delete({
        where: {
          id: notificationId,
          userId,
        },
        include: NotificationIncludeConfig,
      });
      return notification;
    } catch (error) {
      throw new BadRequestException("Не удалось удалить уведомление!");
    }
  }
}
