"use client";

import { COLLECTION_QUERY_KEYS } from "@/shared/lib/api/query-keys";
import { useInfiniteScroll } from "@/shared/lib/hooks/use-infinity-scroll";
import { PaginationQueryDto } from "@apartment-crm/helpers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  CollectionApi,
  CreateCollectionDto,
  FindCollectionsForUserResponse,
  UpdateCollectionDto,
} from "./api";

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

export function useFindCollectionsForUser(
  dto: Partial<PaginationQueryDto>,
  options = {},
) {
  return useInfiniteScroll<FindCollectionsForUserResponse>({
    queryKey: [...COLLECTION_QUERY_KEYS.collections, dto.search || ""],
    queryFn: ({ pageParam }) => {
      return CollectionApi.findForUser({ ...dto, page: pageParam });
    },
    getNextPageParam: (lastPage, allPages) => {
      const hasMore = lastPage.hasMore;
      return hasMore ? allPages.length + 1 : undefined;
    },
  });
}

export function useFindCollectionsForUserPerPage(
  dto: Partial<PaginationQueryDto>,
  options = {},
) {
  return useQuery({
    queryKey: [
      ...COLLECTION_QUERY_KEYS.collections,
      dto.page,
      dto.perPage,
      dto.search,
      dto.sortOrder,
    ],
    queryFn: () => CollectionApi.findForUser(dto),
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
