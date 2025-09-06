import { Heading } from "@/shared/ui/heading";

import { FC } from "react";

import { ApartmentWithRelations } from "../model/apartment-with-relations";
import {
  ApartmentRowCard,
  ApartmentRowCardSkeleton,
} from "./apartment-row-card";

interface Props {
  apartments: ApartmentWithRelations[];
  isInAdminPage?: boolean;
  isInClientPage?: boolean;
  clientId?: string;
}

export const ApartmentRowSheet: FC<Props> = ({
  apartments,
  isInAdminPage,
  isInClientPage,
  clientId,
}) => {
  return (
    <div className="w-full space-y-5">
      {apartments.length > 0 ? (
        apartments.map((apartment) => {
          const isLiked = apartment.clientsLikes.some(
            (like) => like.clientId === clientId,
          );
          const isSeen = apartment.clientViews.some(
            (view) => view.clientId === clientId,
          );
          return (
            <ApartmentRowCard
              key={apartment.id}
              apartment={apartment}
              isInAdminPage={isInAdminPage}
              isInClientPage={isInClientPage}
              isLiked={isLiked}
              isSeen={isSeen}
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

export const ApartmentRowSheetSkeleton = ({ n = 10 }: { n?: number }) => {
  return (
    <div className="w-full space-y-5">
      {Array(n)
        .fill(0)
        .map((_, index) => {
          return <ApartmentRowCardSkeleton key={index} />;
        })}
    </div>
  );
};
