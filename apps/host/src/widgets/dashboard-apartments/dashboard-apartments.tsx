"use client";

import { useFindApartmentsForUser } from "@/entities/apartment/api/hooks";
import {
  ApartmentRowSheet,
  ApartmentRowSheetSkeleton,
} from "@/entities/apartment/ui/apartment-row-sheet";
import { Pagination } from "@/features/pagination/pagination";
import { QueryParamsFilters } from "@/features/query-params-filters/query-params-filters";
import { AuthRoutes } from "@/shared/config/routes/routes.auth";
import { usePaginateParams } from "@/shared/lib/hooks/use-paginate-params";
import { Button } from "@/shared/ui/button";
import { Heading } from "@/shared/ui/heading";
import Link from "next/link";

export const DashboardApartments = () => {
  const { params } = usePaginateParams();

  const { data: apartmentsData, isPending } = useFindApartmentsForUser(params);

  return (
    <div className="w-full">
      <div className="mb-8 flex items-center gap-3 max-sm:flex-col justify-between">
        <Heading size={"h2"}>Добавленные квартиры</Heading>

        <Button variant={"outline"} asChild>
          <Link href={AuthRoutes.CREATE_APARTMENT}>Добавить объект</Link>
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
