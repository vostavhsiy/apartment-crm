"use client";

import { useProfile } from "@/entities/user/api/hooks";
import {
  APARTMENT_QUERY_KEYS,
  CLIENT_QUERY_KEYS,
  COLLECTION_QUERY_KEYS,
  NOTIFICATION_QUERY_KEYS,
  USER_QUERY_KEYS,
} from "@/shared/lib/api/query-keys";
import { socketService } from "@/shared/lib/api/websockets";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useEffect } from "react";

export const NotificationsProvider = () => {
  const { data: profile } = useProfile();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (profile?.id) {
      socketService.connect().then().catch(console.error);
      socketService.on("message", (data) => {
        if (!data.message) return;
        toast.info(data.message);
        queryClient.invalidateQueries({
          queryKey: NOTIFICATION_QUERY_KEYS.notifications,
        });
        queryClient.invalidateQueries({
          queryKey: USER_QUERY_KEYS.profile,
        });
        queryClient.invalidateQueries({
          queryKey: USER_QUERY_KEYS.stats,
        });
        queryClient.invalidateQueries({
          queryKey: APARTMENT_QUERY_KEYS.apartments,
        });
        queryClient.invalidateQueries({
          queryKey: COLLECTION_QUERY_KEYS.collections,
        });
        queryClient.invalidateQueries({
          queryKey: CLIENT_QUERY_KEYS.clients,
        });
      });
    }

    return () => {
      socketService.disconnect();
    };
  }, [profile?.id]);

  return null;
};
