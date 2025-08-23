"use client";

import { useFindApartmentsForUser } from "@/entities/apartment/api/hooks";
import {
  ApartmentRowSheet,
  ApartmentRowSheetSkeleton,
} from "@/entities/apartment/ui/apartment-row-sheet";
import { Pagination } from "@/features/pagination/pagination";
import { QueryParamsFilters } from "@/features/query-params-filters/query-params-filters";
import { usePaginateParams } from "@/shared/lib/hooks/use-paginate-params";
import { Heading } from "@/shared/ui/heading";

export const DashboardApartments = () => {
  const { params } = usePaginateParams();

  const { data: apartmentsData, isPending } = useFindApartmentsForUser(params);

  return (
    <div className="w-full">
      <Heading size={"h2"} className='mb-5'>Добавленные квартиры</Heading>
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
