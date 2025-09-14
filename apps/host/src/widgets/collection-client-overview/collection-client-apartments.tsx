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

import { CollectionClientListMapToggle } from "./collection-client-list-map-toggle";

interface Props {
  collectionClientLink: FindCollectionLinkResponse;
}

export const CollectionClientApartments: FC<Props> = ({
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
      <div className="flex items-center justify-between gap-5 mb-5">
        <Heading className="text-muted-foreground max-md:text-lg">
          Подбор объектов
        </Heading>
        <div className="flex items-center gap-3">
          <CollectionClientListMapToggle
            collectionClientLinkId={collectionClientLink.id}
          />
        </div>
      </div>
      <QueryParamsFilters />
      {!pending && client && (
        <ApartmentSheet
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
