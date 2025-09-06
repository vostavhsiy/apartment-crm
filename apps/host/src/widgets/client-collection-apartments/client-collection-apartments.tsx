"use client";

import { useFindApartmentsForCollection } from "@/entities/apartment/api/hooks";
import {
  ApartmentSheet,
  ApartmentSheetSkeleton,
} from "@/entities/apartment/ui/apartment-sheet";
import { FindCollectionLinkResponse } from "@/entities/client/api/api";
import { useFindClient } from "@/entities/client/api/hooks";
import { QueryParamsFilters } from "@/features/query-params-filters/query-params-filters";
import { usePaginateParams } from "@/shared/lib/hooks/use-paginate-params";
import { Heading } from "@/shared/ui/heading";
import { Spinner } from "@/shared/ui/spinner";

import { FC } from "react";

interface Props {
  collectionClientLink: FindCollectionLinkResponse;
}

export const ClientCollectionApartments: FC<Props> = ({
  collectionClientLink,
}) => {
  const { params } = usePaginateParams();

  const { data: client, isPending: isClientPending } = useFindClient(
    collectionClientLink.clientId,
  );

  const {
    data: apartmentsData,
    isPending,
    ref,
    hasNextPage,
    isFetchingNextPage,
  } = useFindApartmentsForCollection(collectionClientLink.collectionId, {
    search: params.search,
    sortOrder: params.sortOrder,
    perPage: 6,
  });

  const pending = isPending || isClientPending;

  return (
    <div className="w-full">
      <Heading className="mb-5 text-muted-foreground">Подбор объектов</Heading>
      <QueryParamsFilters />
      {!pending && client && (
        <ApartmentSheet
          client={client}
          collectionClientLink={collectionClientLink}
          apartments={apartmentsData?.pages?.flatMap((page) => page.data) || []}
        />
      )}
      {(pending || !client) && <ApartmentSheetSkeleton n={6} />}
      {isFetchingNextPage && (
        <div className="mt-5">
          <Spinner />
        </div>
      )}
      {hasNextPage && !isFetchingNextPage && <div ref={ref} className="h-10" />}
    </div>
  );
};
