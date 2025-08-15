"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { CollectionApi, CreateCollectionDto, UpdateCollectionDto } from "./api";

const COLLECTION_QUERY_KEYS = {
  collections: ["collections", "list"],
  collection: (id: string) => ["collections", "item", id],
};

export function useCreateCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCollectionDto) =>
      CollectionApi.createCollection(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: COLLECTION_QUERY_KEYS.collections,
      });
    },
  });
}

export function useFindCollectionsForUser(options = {}) {
  return useQuery({
    queryKey: COLLECTION_QUERY_KEYS.collections,
    queryFn: () => CollectionApi.findForUser(),
    ...options,
  });
}

export function useFindCollection(id: string, options = {}) {
  return useQuery({
    queryKey: COLLECTION_QUERY_KEYS.collection(id),
    queryFn: () => CollectionApi.findOne(id),
    enabled: !!id,
    ...options,
  });
}

export function useUpdateCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateCollectionDto }) =>
      CollectionApi.update(id, dto),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: COLLECTION_QUERY_KEYS.collections,
      });
      if (_data?.id) {
        queryClient.invalidateQueries({
          queryKey: COLLECTION_QUERY_KEYS.collection(_data.id),
        });
      }
    },
  });
}

export function useDeleteCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => CollectionApi.delete(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({
        queryKey: COLLECTION_QUERY_KEYS.collections,
      });
      if (id) {
        queryClient.invalidateQueries({
          queryKey: COLLECTION_QUERY_KEYS.collection(id),
        });
      }
    },
  });
}
