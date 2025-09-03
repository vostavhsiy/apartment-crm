"use client";

import { ClientWithRelations } from "@/entities/client/model/client-with-relations";
import { CollectionWithRelations } from "@/entities/collection/model/collection-with-relations";
import { cn } from "@/shared/lib/utils";
import { Check } from "lucide-react";

import { FC } from "react";

interface Props {
  collection: CollectionWithRelations;
  client: ClientWithRelations;
  selectedClient?: ClientWithRelations | null;
  onSelect?: (client: ClientWithRelations | null) => void;
}

export const CollectionToClientItem: FC<Props> = ({
  client,
  collection,
  selectedClient,
  onSelect,
}) => {
  const handleSelect = () => {
    onSelect?.(selectedClient?.id === client.id ? null : client);
  };

  return (
    <div
      key={collection.id}
      className={cn(
        "max-w-full cursor-pointer flex items-center gap-3 justify-between rounded-md p-3 transition-colors hover:bg-accent/80",
        selectedClient?.id === client.id && "bg-accent",
      )}
      onClick={handleSelect}
    >
      <div>
        <p className="text-lg font-semibold">{client.name}</p>
        <p className="text-sm">{client.phone}</p>
      </div>
      {selectedClient?.id === client.id && <Check />}
    </div>
  );
};
