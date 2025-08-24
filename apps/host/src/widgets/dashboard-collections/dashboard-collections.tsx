"use client";

import { useFindCollectionsForUserPerPage } from "@/entities/collection/api/hooks";
import { CollectionSheet, CollectionSheetSkeleton } from "@/entities/collection/ui/collection-sheet";
import { Pagination } from "@/features/pagination/pagination";
import { QueryParamsFilters } from "@/features/query-params-filters/query-params-filters";
import { usePaginateParams } from "@/shared/lib/hooks/use-paginate-params";
import { Heading } from "@/shared/ui/heading";

export const DashboardCollections = () => {
  const { params } = usePaginateParams();

  const { data: collectionsData, isPending } =
    useFindCollectionsForUserPerPage(params);

  return (
    <div className="w-full">
      <Heading size={"h2"} className="mb-5">
        Добавленные подборки
      </Heading>
      <QueryParamsFilters />
      {!isPending && (
        <CollectionSheet collections={collectionsData?.data || []} />
      )}
      {isPending && <CollectionSheetSkeleton />}
      {collectionsData && (
        <Pagination
          currentPage={collectionsData.currentPage}
          totalPages={collectionsData.totalPages}
        />
      )}
    </div>
  );
};
