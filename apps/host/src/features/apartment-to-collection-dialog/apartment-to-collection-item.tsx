"use client";

import { useToggleApartmentToCollection } from "@/entities/apartment/api/hooks";
import { ApartmentWithRelations } from "@/entities/apartment/model/apartment-with-relations";
import { CollectionWithRelations } from "@/entities/collection/model/collection-with-relations";
import { cn, wordEnding } from "@/shared/lib/utils";
import { Checkbox } from "@/shared/ui/checkbox";

import { FC } from "react";

interface Props {
  apartment: ApartmentWithRelations;
  collection: CollectionWithRelations;
}

export const ApartmentToCollectionItem: FC<Props> = ({
  apartment,
  collection,
}) => {
  const { mutate: toggleApartmentToCollection, isPending: isTogglePending } =
    useToggleApartmentToCollection();

  console.log(apartment.collectionsLinks, collection);

  const isConnected = apartment.collectionsLinks.some(
    (link) => link.collectionId === collection.id,
  );

  const handleToggle = () => {
    const order = apartment.collectionsLinks[-1]?.order || 0;
    toggleApartmentToCollection({
      id: apartment.id,
      dto: {
        collectionId: collection.id,
        connect: !isConnected,
        order: order + 1,
      },
    });
  };
  return (
    <div
      key={collection.id}
      className={cn(
        "flex items-center gap-3 rounded-md p-3 transition-colors hover:bg-accent/80",
        isConnected && "bg-accent",
        isTogglePending && "pointer-events-none animate-pulse",
      )}
    >
      <Checkbox checked={isConnected} onCheckedChange={handleToggle} />
      <div>
        <p className="text-lg font-semibold">{collection.title}</p>
        <p className="text-sm">
          {collection.apartmentsLinks.length}{" "}
          {wordEnding(collection.apartmentsLinks.length, [
            "объект",
            "объекта",
            "объектов",
          ])}
        </p>
      </div>
    </div>
  );
};
