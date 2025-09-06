import { FindCollectionLinkResponse } from "@/entities/client/api/api";
import { ClientWithRelations } from "@/entities/client/model/client-with-relations";
import { Heading } from "@/shared/ui/heading";

import { FC } from "react";

import { ApartmentWithRelations } from "../model/apartment-with-relations";
import { ApartmentCard, ApartmentCardSkeleton } from "./apartment-card";

interface Props {
  apartments: ApartmentWithRelations[];
  collectionClientLink: FindCollectionLinkResponse;
  client: ClientWithRelations;
}

export const ApartmentSheet: FC<Props> = ({
  apartments,
  collectionClientLink,
  client,
}) => {
  return (
    <div className="w-full grid max-md:grid-cols-1 grid-cols-3 gap-5">
      {apartments.length > 0 ? (
        apartments.map((apartment) => {
          return (
            <ApartmentCard
              key={apartment.id}
              apartment={apartment}
              client={client}
              collectionClientLink={collectionClientLink}
            />
          );
        })
      ) : (
        <Heading asChild size={"h2"} className="p-6">
          <p>Не найдено объектов!</p>
        </Heading>
      )}
    </div>
  );
};

export const ApartmentSheetSkeleton = ({ n = 10 }: { n?: number }) => {
  return (
    <div className="w-full grid max-md:grid-cols-1 grid-cols-3 gap-5">
      {Array(n)
        .fill(0)
        .map((_, index) => {
          return <ApartmentCardSkeleton key={index} />;
        })}
    </div>
  );
};
