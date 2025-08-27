"use client";

import {
  useDeleteNotifications,
  useFindNotificationsForUser,
  useReadNotifications,
} from "@/entities/notification/api/hooks";
import {
  NotificationSheet,
  NotificationSheetSkeleton,
} from "@/entities/notification/ui/notification-sheet";
import { useProfile } from "@/entities/user/api/hooks";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/spinner";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useState } from "react";

export const DashboardNotifications = () => {
  const { data: profile, isPending: isProfilePending } = useProfile();

  const {
    data: notificationData,
    isPending,
    ref,
    hasNextPage,
    isFetchingNextPage,
  } = useFindNotificationsForUser({});

  const { mutate: markAllAsRead, isPending: isReadPending } =
    useReadNotifications();
  const { mutate: clearAllNotifications, isPending: isClearPending } =
    useDeleteNotifications();

  const notifications = !!notificationData?.pages?.[0]?.data.length
    ? notificationData?.pages?.flatMap((page) => page.data)
    : null;

  const [showOnlyUnread, setShowOnlyUnread] = useState(false);

  const filteredNotifications = showOnlyUnread
    ? notifications?.filter((notification) => !notification.isReaded)
    : notifications;

  const count = notificationData?.pages?.[0]?.count || 0;
  const unreadCount =
    profile?.notifications?.filter((n) => !n.isReaded).length || 0;

  return (
    <div className="w-full">
      <div className="mb-8">
        <div className="flex max-md:flex-col max-md:text-center items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Уведомления
            </h1>
            <p className="text-muted-foreground">
              {unreadCount > 0
                ? `У вас ${unreadCount} непрочитанных уведомлений`
                : "Все уведомления прочитаны"}
            </p>
          </div>
          <div className="flex max-md:flex-col max-md:mt-5 gap-2">
            {unreadCount > 0 && (
              <Button
                variant="outline"
                disabled={isClearPending || isReadPending}
                onClick={() =>
                  markAllAsRead(undefined, {
                    onSuccess() {
                      toast.success("Все уведомления прочитаны!");
                    },
                    onError() {
                      toast.success("Ошибка при чтении уведомлений!");
                    },
                  })
                }
              >
                Отметить все как прочитанные
              </Button>
            )}
            <Button
              variant="destructive"
              onClick={() =>
                clearAllNotifications(undefined, {
                  onSuccess() {
                    toast.success("Все уведомления удалены!");
                  },
                  onError() {
                    toast.success("Ошибка при удалении уведомлений!");
                  },
                })
              }
              disabled={
                notifications?.length === 0 || isClearPending || isReadPending
              }
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Очистить все
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-2">
          <Button
            variant={!showOnlyUnread ? "default" : "outline"}
            onClick={() => setShowOnlyUnread(false)}
            className="text-sm"
          >
            Все ({count})
          </Button>
          <Button
            variant={showOnlyUnread ? "default" : "outline"}
            onClick={() => setShowOnlyUnread(true)}
            className="text-sm"
          >
            Непрочитанные ({unreadCount})
          </Button>
        </div>
      </div>
      <div className="w-full">
        {isPending && <NotificationSheetSkeleton />}
        {!isPending && (
          <NotificationSheet notifications={filteredNotifications || []} />
        )}
        {isFetchingNextPage && (
          <div className="mt-5">
            <Spinner />
          </div>
        )}
        {hasNextPage && !isFetchingNextPage && (
          <div ref={ref} className="h-10" />
        )}
      </div>
    </div>
  );
};
