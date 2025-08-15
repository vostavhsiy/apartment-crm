"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { CreateNotificationDto, NotificationApi } from "./api";

export const NOTIFICATION_QUERY_KEYS = {
  notifications: ["notifications", "list"],
};

export function useCreateNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateNotificationDto) =>
      NotificationApi.createNotification(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEYS.notifications,
      });
    },
  });
}

export function useFindNotificationsForUser(options = {}) {
  return useQuery({
    queryKey: NOTIFICATION_QUERY_KEYS.notifications,
    queryFn: () => NotificationApi.findForUser(),
    ...options,
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
    },
  });
}
