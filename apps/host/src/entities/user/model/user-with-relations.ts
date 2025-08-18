import { Notification } from "@/entities/notification/model/notification";

import { User } from "./user";

export interface UserWithRelations extends User {
  notifications: Notification[];
}
