"use client";

import {
  APARTMENT_QUERY_KEYS,
  CLIENT_QUERY_KEYS,
} from "@/shared/lib/api/query-keys";
import { useInfiniteScroll } from "@/shared/lib/hooks/use-infinity-scroll";
import { PaginationQueryDto } from "@apartment-crm/helpers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  ClientApi,
  CreateClientDto,
  FindClientsForUser,
  SeeApartmentDto,
  ToggleApartmentToClientDto,
  ToggleClientToCollectionDto,
  UpdateClientDto,
} from "./api";

export function useCreateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateClientDto) => ClientApi.createClient(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLIENT_QUERY_KEYS.clients });
    },
  });
}

export function useFindClientsForUser(
  dto: Partial<PaginationQueryDto>,
  options = {},
) {
  return useInfiniteScroll<FindClientsForUser>({
    queryKey: [...CLIENT_QUERY_KEYS.clients, dto.search || ""],
    queryFn: ({ pageParam }) => {
      return ClientApi.findForUser({ ...dto, page: pageParam });
    },
    getNextPageParam: (lastPage, allPages) => {
      const hasMore = lastPage.hasMore;
      return hasMore ? allPages.length + 1 : undefined;
    },
  });
}

export function useFindClientsForUserPerPage(
  dto: Partial<PaginationQueryDto>,
  options = {},
) {
  return useQuery({
    queryKey: [
      ...CLIENT_QUERY_KEYS.clients,
      dto.page,
      dto.perPage,
      dto.search,
      dto.sortOrder,
    ],
    queryFn: () => ClientApi.findForUser(dto),
    ...options,
  });
}

export function useFindClientStats(clientId: string, options = {}) {
  return useQuery({
    queryKey: CLIENT_QUERY_KEYS.clientStats(clientId),
    queryFn: () => ClientApi.findClientStats(clientId),
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
        queryClient.invalidateQueries({
          queryKey: CLIENT_QUERY_KEYS.clientStats(variables.id),
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
        queryClient.invalidateQueries({
          queryKey: CLIENT_QUERY_KEYS.clientStats(variables.id),
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
      queryClient.invalidateQueries({
        queryKey: APARTMENT_QUERY_KEYS.apartments,
      });
      if (variables?.id) {
        queryClient.invalidateQueries({
          queryKey: CLIENT_QUERY_KEYS.client(variables.id),
        });
        queryClient.invalidateQueries({
          queryKey: CLIENT_QUERY_KEYS.clientStats(variables.id),
        });
      }
      if (variables?.dto?.apartmentId) {
        queryClient.invalidateQueries({
          queryKey: APARTMENT_QUERY_KEYS.apartment(variables.dto.apartmentId),
        });
      }
    },
  });
}

export function useSeeApartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: SeeApartmentDto) => ClientApi.seeApartment(dto),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: CLIENT_QUERY_KEYS.clients });
      if (variables?.clientId) {
        queryClient.invalidateQueries({
          queryKey: CLIENT_QUERY_KEYS.client(variables.clientId),
        });
        queryClient.invalidateQueries({
          queryKey: CLIENT_QUERY_KEYS.clientStats(variables.clientId),
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
        queryClient.invalidateQueries({
          queryKey: CLIENT_QUERY_KEYS.clientStats(id),
        });
      }
    },
  });
}
