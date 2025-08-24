import { Heading } from "@/shared/ui/heading";

import { FC } from "react";

import { CollectionWithRelations } from "../model/collection-with-relations";
import { CollectionCard, CollectionCardSkeleton } from "./collection-card";

interface Props {
  collections: CollectionWithRelations[];
}

export const CollectionSheet: FC<Props> = ({ collections }) => {
  return (
    <div className="w-full space-y-5">
      {" "}
      {collections.length > 0 ? (
        collections.map((collection) => {
          return <CollectionCard key={collection.id} collection={collection} />;
        })
      ) : (
        <Heading asChild size={"h2"} className="p-6">
          <p>Не найдено подборок!</p>
        </Heading>
      )}
    </div>
  );
};


export const CollectionSheetSkeleton = ({ n = 10 }: { n?: number }) => {
  return (
    <div className="w-full space-y-5">
      {Array(n)
        .fill(0)
        .map((_, index) => {
          return <CollectionCardSkeleton key={index} />;
        })}
    </div>
  );
};
