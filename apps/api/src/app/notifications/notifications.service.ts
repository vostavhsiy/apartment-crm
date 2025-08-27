import { paginate, PaginationQueryDto } from "@apartment-crm/helpers";
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Notification, Prisma } from "@prisma/client";

import { DbService } from "./../db/db.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { NotificationIncludeConfig } from "./notifications.config";

@Injectable()
export class NotificationsService {
  private logger = new Logger(NotificationsService.name, { timestamp: true });

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
        orderBy: {
          createdAt: "desc",
        },
      });
      return data;
    } catch (error) {
      throw new NotFoundException("Уведомления не найдены!");
    }
  }

  async readForUser(userId: string) {
    try {
      const data = await this.dbService.notification.updateMany({
        where: {
          userId,
        },
        data: {
          isReaded: true,
        },
      });
      return data.count;
    } catch (error) {
      throw new BadRequestException("Не удалось прочитать уведомления!");
    }
  }

  async readOneForUser(notId: string, userId: string) {
    try {
      const notification = await this.dbService.notification.update({
        where: {
          id: notId,
          userId,
        },
        data: {
          isReaded: true,
        },
      });
      return notification;
    } catch (error) {
      throw new BadRequestException("Не удалось прочитать уведомление!");
    }
  }

  async removeForUser(userId: string) {
    try {
      const notification = await this.dbService.notification.deleteMany({
        where: {
          userId,
        },
      });
      return notification.count;
    } catch (error) {
      throw new BadRequestException("Не удалось удалить уведомления!");
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

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cleanUpNotifications() {
    this.logger.log("Starting cleanup of old notifications...");

    try {
      const fiveDaysAgo = new Date();
      fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

      const result = await this.dbService.notification.deleteMany({
        where: {
          createdAt: { lt: fiveDaysAgo },
        },
      });

      this.logger.log(
        `Cleanup completed. Deleted ${result.count} notifications`,
      );
    } catch (error) {
      this.logger.error(error);
      this.logger.error("Error during cleanup notifications");
    }
  }
}
