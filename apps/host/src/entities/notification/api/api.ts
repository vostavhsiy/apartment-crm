import { ROUTES } from "@/shared/lib/api/routes";
import { authInstance, publicInstance } from "@/shared/lib/axios";
import { PaginatedResult } from "@apartment-crm/helpers";

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

export interface DeleteNotificationResponse extends Notification {}

export class NotificationApi {
  static async createNotification(data: CreateNotificationDto) {
    const res = await authInstance.post<CreateNotificationResponse>(
      ROUTES.notifications.create.path,
      data,
    );
    return res.data;
  }

  static async findForUser() {
    const res = await publicInstance.get<FindNotificationsForUserResponse>(
      ROUTES.notifications.findForUser.path,
    );
    return res.data;
  }

  static async delete(id: string) {
    const res = await authInstance.delete<DeleteNotificationResponse>(
      ROUTES.notifications.delete(id).path,
    );
    return res.data;
  }
}
