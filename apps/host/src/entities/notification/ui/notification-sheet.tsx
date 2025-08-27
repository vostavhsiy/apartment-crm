import { Card, CardContent } from "@/shared/ui/card";
import { Bell } from "lucide-react";

import { FC } from "react";

import { NotificationWithRelations } from "../model/notification-with-relations";
import {
  NotificationCard,
  NotificationCardSkeleton,
} from "./notification-card";

interface Props {
  notifications: NotificationWithRelations[];
  showOnlyUnread?: boolean;
}

export const NotificationSheet: FC<Props> = ({
  notifications,
  showOnlyUnread,
}) => {
  return (
    <div className="w-full space-y-4">
      {notifications.length <= 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Нет уведомлений
            </h3>
            <p className="text-muted-foreground text-center">
              {showOnlyUnread
                ? "Нет непрочитанных уведомлений"
                : "У вас пока нет уведомлений"}
            </p>
          </CardContent>
        </Card>
      ) : (
        notifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))
      )}
    </div>
  );
};

export const NotificationSheetSkeleton = ({ n = 10 }: { n?: number }) => {
  return (
    <div className="w-full space-y-4">
      {Array(n)
        .fill(0)
        .map((_, index) => {
          return <NotificationCardSkeleton key={index} />;
        })}
    </div>
  );
};
