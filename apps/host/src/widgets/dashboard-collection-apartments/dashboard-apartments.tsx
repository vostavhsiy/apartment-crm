"use client";

import { useFindApartmentsForCollectionPerPage } from "@/entities/apartment/api/hooks";
import {
  ApartmentRowSheet,
  ApartmentRowSheetSkeleton,
} from "@/entities/apartment/ui/apartment-row-sheet";
import { useFindCollection } from "@/entities/collection/api/hooks";
import { Pagination } from "@/features/pagination/pagination";
import { QueryParamsFilters } from "@/features/query-params-filters/query-params-filters";
import { AuthRoutes } from "@/shared/config/routes/routes.auth";
import { usePaginateParams } from "@/shared/lib/hooks/use-paginate-params";
import { wordEnding } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Heading } from "@/shared/ui/heading";
import { Spinner } from "@/shared/ui/spinner";
import Link from "next/link";

import { FC } from "react";

interface Props {
  collectionId: string;
}

export const DashboardCollectionApartments: FC<Props> = ({ collectionId }) => {
  const { params } = usePaginateParams();

  const { data: collection, isPending: isCollectionPending } =
    useFindCollection(collectionId);

  const { data: apartmentsData, isPending } =
    useFindApartmentsForCollectionPerPage(collectionId, params);

  if (isCollectionPending) return <Spinner />;

  return (
    <div className="w-full">
      <div className="mb-5 flex max-sm:flex-col max-sm:items-center items-start justify-between gap-5">
        <div>
          <Heading size={"h2"} className="mb-2">
            {collection?.title}
          </Heading>
          <p className="text-sm">
            Сохраняйте и группируйте интересные объекты. Здесь{" "}
            {wordEnding(collection?.apartmentsLinks.length || 0, [
              "сохранен",
              "сохранены",
              "сохранены",
            ])}{" "}
            {collection?.apartmentsLinks.length}{" "}
            {wordEnding(collection?.apartmentsLinks.length || 0, [
              "объект",
              "объекта",
              "объектов",
            ])}
          </p>
        </div>
        <Button variant={"outline"} asChild>
          <Link href={AuthRoutes.DASHBOARD_COLLECTION_EDIT(collectionId)}>
            Редактировать подборку
          </Link>
        </Button>
      </div>
      <QueryParamsFilters />
      {!isPending && (
        <ApartmentRowSheet
          apartments={apartmentsData?.data || []}
          isInAdminPage
        />
      )}
      {isPending && <ApartmentRowSheetSkeleton />}
      {apartmentsData && (
        <Pagination
          currentPage={apartmentsData.currentPage}
          totalPages={apartmentsData.totalPages}
        />
      )}
    </div>
  );
};
