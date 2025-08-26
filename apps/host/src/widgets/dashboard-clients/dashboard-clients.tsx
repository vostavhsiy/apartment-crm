"use client";

import { useFindClientsForUser } from "@/entities/client/api/hooks";
import {
  ClientSheet,
  ClientSheetSkeleton,
} from "@/entities/client/ui/client-sheet";
import { Pagination } from "@/features/pagination/pagination";
import { QueryParamsFilters } from "@/features/query-params-filters/query-params-filters";
import { AuthRoutes } from "@/shared/config/routes/routes.auth";
import { usePaginateParams } from "@/shared/lib/hooks/use-paginate-params";
import { Button } from "@/shared/ui/button";
import { Heading } from "@/shared/ui/heading";
import Link from "next/link";

export const DashboardClients = () => {
  const { params } = usePaginateParams();

  const { data: clientsData, isPending } = useFindClientsForUser(params);

  return (
    <div className="w-full">
      <div className="mb-8 flex items-center gap-3 max-sm:flex-col justify-between">
        <Heading size={"h2"}>Добавленные клиенты</Heading>
        <Button variant={"outline"} asChild>
          <Link href={AuthRoutes.CREATE_CLIENT}>Добавить клиента</Link>
        </Button>
      </div>
      <QueryParamsFilters />
      {!isPending && <ClientSheet clients={clientsData?.data || []} />}
      {isPending && <ClientSheetSkeleton />}
      {clientsData && (
        <Pagination
          currentPage={clientsData.currentPage}
          totalPages={clientsData.totalPages}
        />
      )}
    </div>
  );
};
