import { ROUTES } from "@/shared/lib/api/routes";
import { authInstance } from "@/shared/lib/axios";
import { PaginatedResult, PaginationQueryDto } from "@apartment-crm/helpers";

import { Notification } from "../model/notification";
import { NotificationWithRelations } from "../model/notification-with-relations";

export interface CreateNotificationDto {
  title: string;

  body?: string;

  link?: string;
}

export interface CreateNotificationResponse extends NotificationWithRelations {}

export interface FindNotificationsForUserResponse
  extends PaginatedResult<Notification> {}

export type ReadNotificationsResponse = number;

export interface ReadNotificationResponse extends NotificationWithRelations {}

export type DeleteNotificationResponse = number;

export type DeleteNotificationsForUserResponse = number;

export class NotificationApi {
  static async createNotification(data: CreateNotificationDto) {
    const res = await authInstance.post<CreateNotificationResponse>(
      ROUTES.notifications.create.path,
      data,
    );
    return res.data;
  }

  static async findForUser(dto: Partial<PaginationQueryDto>) {
    const res = await authInstance.get<FindNotificationsForUserResponse>(
      ROUTES.notifications.findForUser.path,
      {
        params: dto,
      },
    );
    return res.data;
  }

  static async readForUser() {
    const res = await authInstance.patch<ReadNotificationsResponse>(
      ROUTES.notifications.readForUser.path,
    );
    return res.data;
  }

  static async readOneForUser(id: string) {
    const res = await authInstance.patch<ReadNotificationResponse>(
      ROUTES.notifications.readOneForUser(id).path,
    );
    return res.data;
  }

  static async delete(id: string) {
    const res = await authInstance.delete<DeleteNotificationResponse>(
      ROUTES.notifications.delete(id).path,
    );
    return res.data;
  }

  static async deleteForUser() {
    const res = await authInstance.delete<DeleteNotificationsForUserResponse>(
      ROUTES.notifications.deleteForUser.path,
    );
    return res.data;
  }
}
