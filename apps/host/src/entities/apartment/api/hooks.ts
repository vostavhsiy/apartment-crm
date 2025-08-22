"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  ApartmentApi,
  CreateApartmentDto,
  ToggleApartmentToCollectionDto,
  UpdateApartmentDto,
} from "./api";

const APARTMENT_QUERY_KEYS = {
  apartments: ["apartments", "list"],
  apartment: (id: string) => ["apartments", "item", id],
};

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

export function useFindApartmentsForCollection(
  collectionId: string,
  options = {},
) {
  return useQuery({
    queryKey: [...APARTMENT_QUERY_KEYS.apartments, { collectionId }],
    queryFn: () => ApartmentApi.findForCollection(collectionId),
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
