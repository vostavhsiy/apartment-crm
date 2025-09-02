"use client";

import {
  NOTIFICATION_QUERY_KEYS,
  USER_QUERY_KEYS,
} from "@/shared/lib/api/query-keys";
import { useInfiniteScroll } from "@/shared/lib/hooks/use-infinity-scroll";
import { PaginationQueryDto } from "@apartment-crm/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  CreateNotificationDto,
  FindNotificationsForUserResponse,
  NotificationApi,
} from "./api";

export function useCreateNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateNotificationDto) =>
      NotificationApi.createNotification(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEYS.notifications,
      });
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEYS.profile,
      });
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEYS.stats,
      });
    },
  });
}

export function useFindNotificationsForUser(
  dto: Partial<PaginationQueryDto>,
  options = {},
) {
  return useInfiniteScroll<FindNotificationsForUserResponse>({
    queryKey: NOTIFICATION_QUERY_KEYS.notifications,
    queryFn: ({ pageParam }) => {
      return NotificationApi.findForUser({ ...dto, page: pageParam });
    },
    getNextPageParam: (lastPage, allPages) => {
      const hasMore = lastPage.hasMore;
      return hasMore ? allPages.length + 1 : undefined;
    },
  });
}

export function useReadNotifications() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => NotificationApi.readForUser(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEYS.notifications,
      });
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEYS.profile,
      });
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEYS.stats,
      });
    },
  });
}

export function useReadNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => NotificationApi.readOneForUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEYS.notifications,
      });
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEYS.profile,
      });
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEYS.stats,
      });
    },
  });
}

export function useDeleteNotifications() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => NotificationApi.deleteForUser(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEYS.notifications,
      });
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEYS.profile,
      });
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEYS.stats,
      });
    },
  });
}

export function useDeleteNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => NotificationApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEYS.notifications,
      });
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEYS.profile,
      });
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEYS.stats,
      });
    },
  });
}
