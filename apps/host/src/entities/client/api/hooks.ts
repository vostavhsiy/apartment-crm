"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  ClientApi,
  CreateClientDto,
  ToggleApartmentToClientDto,
  ToggleClientToCollectionDto,
  UpdateClientDto,
} from "./api";

const CLIENT_QUERY_KEYS = {
  clients: ["clients", "list"],
  client: (id: string) => ["clients", "item", id],
};

export function useCreateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateClientDto) => ClientApi.createClient(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLIENT_QUERY_KEYS.clients });
    },
  });
}

export function useFindClientsForUser(options = {}) {
  return useQuery({
    queryKey: CLIENT_QUERY_KEYS.clients,
    queryFn: () => ClientApi.findForUser(),
    ...options,
  });
}

export function useFindClient(id: string, options = {}) {
  return useQuery({
    queryKey: CLIENT_QUERY_KEYS.client(id),
    queryFn: () => ClientApi.findOne(id),
    enabled: !!id,
    ...options,
  });
}

export function useUpdateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateClientDto }) =>
      ClientApi.update(id, dto),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: CLIENT_QUERY_KEYS.clients });
      if (variables?.id) {
        queryClient.invalidateQueries({
          queryKey: CLIENT_QUERY_KEYS.client(variables.id),
        });
      }
    },
  });
}

export function useToggleClientToCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      dto,
    }: {
      id: string;
      dto: ToggleClientToCollectionDto;
    }) => ClientApi.toggleClientToCollection(id, dto),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: CLIENT_QUERY_KEYS.clients });
      if (variables?.id) {
        queryClient.invalidateQueries({
          queryKey: CLIENT_QUERY_KEYS.client(variables.id),
        });
      }
    },
  });
}

export function useToggleApartmentToClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      dto,
    }: {
      id: string;
      dto: ToggleApartmentToClientDto;
    }) => ClientApi.toggleApartmentToClient(id, dto),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: CLIENT_QUERY_KEYS.clients });
      if (variables?.id) {
        queryClient.invalidateQueries({
          queryKey: CLIENT_QUERY_KEYS.client(variables.id),
        });
      }
    },
  });
}

export function useDeleteClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ClientApi.delete(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: CLIENT_QUERY_KEYS.clients });
      if (id) {
        queryClient.invalidateQueries({
          queryKey: CLIENT_QUERY_KEYS.client(id),
        });
      }
    },
  });
}
