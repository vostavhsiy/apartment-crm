"use client";

import {
  APARTMENT_QUERY_KEYS,
  COLLECTION_QUERY_KEYS,
} from "@/shared/lib/api/query-keys";
import { PaginationQueryDto } from "@apartment-crm/helpers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  ApartmentApi,
  CreateApartmentDto,
  ToggleApartmentToCollectionDto,
  UpdateApartmentDto,
} from "./api";

export function useCreateApartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateApartmentDto) =>
      ApartmentApi.createApartment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: APARTMENT_QUERY_KEYS.apartments,
      });
    },
  });
}

export function useFindApartmentsForUserPerPage(
  dto: Partial<PaginationQueryDto>,
  options = {},
) {
  return useQuery({
    queryKey: [
      ...APARTMENT_QUERY_KEYS.apartments,
      dto.page,
      dto.perPage,
      dto.search,
      dto.sortOrder,
    ],
    queryFn: () => ApartmentApi.findForUser(dto),
    ...options,
  });
}

export function useFindApartmentsForCollection(
  collectionId: string,
  dto: Partial<PaginationQueryDto>,
  options = {},
) {
  return useQuery({
    queryKey: [
      ...APARTMENT_QUERY_KEYS.apartments,
      collectionId,
      dto.page,
      dto.perPage,
      dto.search,
      dto.sortOrder,
    ],
    queryFn: () => ApartmentApi.findForCollection(collectionId, dto),
    enabled: !!collectionId,
    ...options,
  });
}

export function useFindApartment(id: string, options = {}) {
  return useQuery({
    queryKey: APARTMENT_QUERY_KEYS.apartment(id),
    queryFn: () => ApartmentApi.findOne(id),
    enabled: !!id,
    ...options,
  });
}

export function useUpdateApartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateApartmentDto }) =>
      ApartmentApi.update(id, dto),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: APARTMENT_QUERY_KEYS.apartments,
      });
      if (variables?.id) {
        queryClient.invalidateQueries({
          queryKey: APARTMENT_QUERY_KEYS.apartment(variables.id),
        });
      }
    },
  });
}

export function useToggleApartmentToCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      dto,
    }: {
      id: string;
      dto: ToggleApartmentToCollectionDto;
    }) => ApartmentApi.toggleApartmentToCollection(id, dto),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: APARTMENT_QUERY_KEYS.apartment(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: APARTMENT_QUERY_KEYS.apartments,
      });
      queryClient.invalidateQueries({
        queryKey: COLLECTION_QUERY_KEYS.collections,
      });
      if (variables?.id) {
        queryClient.invalidateQueries({
          queryKey: APARTMENT_QUERY_KEYS.apartment(variables.id),
        });
      }
    },
  });
}

export function useDeleteApartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ApartmentApi.delete(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({
        queryKey: APARTMENT_QUERY_KEYS.apartments,
      });
      if (id) {
        queryClient.invalidateQueries({
          queryKey: APARTMENT_QUERY_KEYS.apartment(id),
        });
      }
    },
  });
}

export function useGetApartmentInfoFromAi() {
  return useMutation({
    mutationFn: (url: string) => ApartmentApi.getApartmentInfoFromAi(url),
  });
}
