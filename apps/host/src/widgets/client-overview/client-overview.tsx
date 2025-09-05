"use client";

import { useFindApartmentsForClient } from "@/entities/apartment/api/hooks";
import {
  ApartmentRowSheet,
  ApartmentRowSheetSkeleton,
} from "@/entities/apartment/ui/apartment-row-sheet";
import { useFindClient, useFindClientStats } from "@/entities/client/api/hooks";
import { Pagination } from "@/features/pagination/pagination";
import { QueryParamsFilters } from "@/features/query-params-filters/query-params-filters";
import { AuthRoutes } from "@/shared/config/routes/routes.auth";
import { usePaginateParams } from "@/shared/lib/hooks/use-paginate-params";
import { Button } from "@/shared/ui/button";
import { Heading } from "@/shared/ui/heading";
import { Spinner } from "@/shared/ui/spinner";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { FC } from "react";

import { ClientStats } from "../client-stats/client-stats";

interface Props {
  clientId: string;
}

export const ClientOverview: FC<Props> = ({ clientId }) => {
  const { params } = usePaginateParams();

  const { data: apartmentsData, isPending } = useFindApartmentsForClient(
    clientId,
    params,
  );

  const { data: client, isPending: isClientPending } = useFindClient(clientId);

  const { data: clientStats, isPending: isStatsPending } =
    useFindClientStats(clientId);

  const pending = isPending || isStatsPending || isClientPending;

  if (pending) return <Spinner />;

  if (!isPending && !apartmentsData) {
    return <Spinner />;
  }

  return (
    <div className="w-full">
      <Button asChild className="mb-10" variant={"outline"}>
        <Link href={AuthRoutes.CLIENTS}>
          {" "}
          <ChevronLeft /> Список клиентов
        </Link>
      </Button>
      <div className="mb-8 flex items-center gap-3 max-sm:flex-col justify-between">
        <div className="max-sm:text-center">
          <Heading size={"h2"}>
            Объекты, отправленные клиенту «{client?.name}»
          </Heading>
          <p className="text-muted-foreground">
            Номер телефона: {client?.phone}
          </p>
        </div>
        <Button variant={"outline"} asChild>
          <Link href={AuthRoutes.DASHBOARD_CLIENT_EDIT(clientId)}>
            Редактировать клиента
          </Link>
        </Button>
      </div>
      {clientStats && <ClientStats clientStats={clientStats} />}
      <QueryParamsFilters />
      {!isPending && (
        <ApartmentRowSheet
          isInClientPage
          clientId={clientId}
          apartments={apartmentsData?.data || []}
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
