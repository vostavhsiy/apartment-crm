"use client";

import {
  NOTIFICATION_QUERY_KEYS,
  USER_QUERY_KEYS,
} from "@/shared/lib/api/query-keys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  ResetPasswordDto,
  SignInDto,
  SignUpDto,
  ToggleBanDto,
  UpdateUserDto,
  UserApi,
} from "./api";

export function useSignUp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SignUpDto) => UserApi.signUp(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.profile });
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEYS.notifications,
      });
    },
  });
}

export function useSignIn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SignInDto) => UserApi.signIn(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.profile });
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEYS.notifications,
      });
    },
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => UserApi.signOut(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.profile });
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEYS.notifications,
      });
    },
  });
}

export function useRefreshAccessToken() {
  return useMutation({
    mutationFn: () => UserApi.refreshAccessToken(),
  });
}

export function useProfile(options = {}) {
  return useQuery({
    queryKey: USER_QUERY_KEYS.profile,
    queryFn: () => UserApi.getProfile(),
    ...options,
  });
}

export function useSendActivationMail() {
  return useMutation({
    mutationFn: () => UserApi.sendActivationMail(),
  });
}

export function useSendResetPasswordEmail() {
  return useMutation({
    mutationFn: (email: string) => UserApi.sendResetPasswordEmail(email),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordDto) => UserApi.resetPassword(data),
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) =>
      UserApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.profile });
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEYS.notifications,
      });
    },
  });
}

export function useToggleBan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ToggleBanDto }) =>
      UserApi.toggleBan(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.profile });
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEYS.notifications,
      });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => UserApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.profile });
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEYS.notifications,
      });
    },
  });
}
