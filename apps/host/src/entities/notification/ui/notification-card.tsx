"use client";

import { getRelativeTime } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { Bell, ExternalLink, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { FC } from "react";

import { useDeleteNotification, useReadNotification } from "../api/hooks";
import { NotificationWithRelations } from "../model/notification-with-relations";

interface Props {
  notification: NotificationWithRelations;
}

export const NotificationCard: FC<Props> = ({ notification }) => {
  const { mutate: markAsRead, isPending: isReadPending } =
    useReadNotification();
  const { mutate: deleteNotification, isPending: isDeletePending } =
    useDeleteNotification();

  return (
    <Card
      className={`transition-all duration-200 hover:shadow-md ${
        !notification.isReaded
          ? "border-l-4 border-l-primary bg-card"
          : "bg-muted/30"
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex max-sm:flex-col-reverse max-sm:items-end items-start justify-between max-sm:gap-5">
          <div className="max-sm:w-full  flex items-start gap-3 flex-1">
            <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3
                  className={`font-semibold ${!notification.isReaded ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {notification.title}
                </h3>
                {!notification.isReaded && (
                  <div className="h-2 w-2 bg-primary rounded-full" />
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {getRelativeTime(notification.createdAt)}
            </span>
            <Button
              variant="ghost"
              size="sm"
              disabled={isDeletePending || isReadPending}
              onClick={() =>
                deleteNotification(notification.id, {
                  onSuccess() {
                    toast.success("Уведомление удалено!");
                  },
                  onError() {
                    toast.error("Ошибка при удалении уведомления!");
                  },
                })
              }
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p
          className={`text-sm leading-relaxed mb-3 ${!notification.isReaded ? "text-foreground" : "text-muted-foreground"}`}
        >
          {notification.body}
        </p>
        <div className="flex max-sm:flex-col items-center gap-2">
          {notification.link && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-primary max-sm:w-full hover:text-primary/80"
            >
              <Link href={notification.link}>
                <ExternalLink className="size-4 mr-1" />
                Перейти
              </Link>
            </Button>
          )}
          {!notification.isReaded && (
            <Button
              variant="ghost"
              size="sm"
              disabled={isDeletePending || isReadPending}
              onClick={() =>
                markAsRead(notification.id, {
                  onSuccess() {
                    toast.success("Уведомление прочитано!");
                  },
                  onError() {
                    toast.error("Ошибка при чтении уведомления!");
                  },
                })
              }
              className="text-primary max-sm:w-full hover:text-primary/80"
            >
              Отметить как прочитанное
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const NotificationCardSkeleton = () => {
  return <Skeleton className="w-full h-48" />;
};
