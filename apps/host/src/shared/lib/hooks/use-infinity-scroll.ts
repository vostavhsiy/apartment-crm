import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { useEffect } from "react";

interface UseInfiniteScrollProps<T> {
  queryKey: string[];
  queryFn: ({ pageParam }: { pageParam: number }) => Promise<T>;
  getNextPageParam: (lastPage: T, allPages: T[]) => number | undefined;
  initialPageParam?: number;
  enabled?: boolean;
}

export function useInfiniteScroll<T>({
  queryKey,
  queryFn,
  getNextPageParam,
  initialPageParam = 1,
  enabled = true,
}: UseInfiniteScrollProps<T>) {
  const { ref, inView } = useInView();

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => queryFn({ pageParam }),
    initialPageParam,
    getNextPageParam,
    enabled,
  });

  useEffect(() => {
    if (inView && query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  }, [
    inView,
    query.hasNextPage,
    query.isFetchingNextPage,
    query.fetchNextPage,
  ]);

  return {
    ...query,
    ref,
  };
}
