import { Heading } from "@/shared/ui/heading";

import { FC } from "react";

import { ClientWithRelations } from "../model/client-with-relations";
import { ClientCard, ClientCardSkeleton } from "./client-card";

interface Props {
  clients: ClientWithRelations[];
}

export const ClientSheet: FC<Props> = ({ clients }) => {
  return (
    <div className="w-full space-y-5">
      {" "}
      {clients.length > 0 ? (
        clients.map((client) => {
          return <ClientCard key={client.id} client={client} />;
        })
      ) : (
        <Heading asChild size={"h2"} className="p-6">
          <p>Не найдено клиентов!</p>
        </Heading>
      )}
    </div>
  );
};

export const ClientSheetSkeleton = ({ n = 10 }: { n?: number }) => {
  return (
    <div className="w-full space-y-5">
      {Array(n)
        .fill(0)
        .map((_, index) => {
          return <ClientCardSkeleton key={index} />;
        })}
    </div>
  );
};
