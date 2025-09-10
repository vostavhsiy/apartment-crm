import { ApartmentWithRelations } from "@/entities/apartment/model/apartment-with-relations";
import { ApartmentCard } from "@/entities/apartment/ui/apartment-card";
import { FindCollectionLinkResponse } from "@/entities/client/api/api";
import { ClientWithRelations } from "@/entities/client/model/client-with-relations";
import { ApartmentFilesDialog } from "@/features/apartment-files-dialog/apartment-files-dialog";
import { ApartmentLikeButton } from "@/features/apartment-like-button/apartment-like-button";
import { MOBILE_BREAKPOINT, useIsMobile } from "@/shared/lib/hooks/use-mobile";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardTitle } from "@/shared/ui/card";
import { Ban, X } from "lucide-react";

import { FC, useState } from "react";

interface Props {
  apartments: ApartmentWithRelations[];
  client: ClientWithRelations;
  collectionClientLink: FindCollectionLinkResponse;
  selectedApartment: ApartmentWithRelations | null;
  setSelectedApartment: (apartment: ApartmentWithRelations | null) => void;
}

export const CollectionClientMapObjects: FC<Props> = ({
  apartments,
  client,
  collectionClientLink,
  selectedApartment,
  setSelectedApartment,
}) => {
  const isMobile = useIsMobile();

  const [collapsed, setCollapsed] = useState(
    window.innerWidth < MOBILE_BREAKPOINT,
  );

  return (
    <>
      <Button
        className="fixed z-[9] top-[7.5rem] right-6 max-md:top-auto max-md:bottom-10 max-md:right-1/2 max-md:translate-x-1/2 max-md:w-[90%] rounded-full shadow-lg"
        variant={isMobile ? "default" : "secondary"}
        onClick={() => setCollapsed(false)}
      >
        Показать объекты
      </Button>
      <div
        className={cn(
          "fixed z-10 transition-all ease-in-out duration-300 right-0 bottom-0 md:max-w-[28.125rem] w-full h-full pt-[15.625rem] md:pt-[6.25rem]",
          collapsed &&
            !selectedApartment &&
            "translate-y-full md:translate-y-0 md:translate-x-full",
        )}
      >
        <div className="w-full h-full flex flex-col bg-background rounded-4xl rounded-br-none max-md:rounded-b-none pl-6 pt-3 shadow-lg overflow-auto">
          <div className="flex items-center justify-between gap-5 mb-5 shrink-0 pr-6">
            <p className="text-xl font-bold">Объекты на карте</p>
            <Button
              size="icon"
              variant="secondary"
              onClick={() => {
                if (selectedApartment) {
                  setSelectedApartment(null);
                } else {
                  setCollapsed(true);
                }
              }}
            >
              <X />
            </Button>
          </div>
          {!selectedApartment &&
            (apartments && apartments.length > 0 ? (
              <div className="flex-1 space-y-5 pr-6 pb-3 overflow-auto">
                {apartments.map((apartment) => (
                  <CollectionClientObjectsItem
                    key={apartment.id}
                    apartment={apartment}
                    client={client}
                    onSelect={setSelectedApartment}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-center text-muted-foreground">
                  На этой территории нет ни одного объекта. Выберите другое
                  место на карте
                </p>
              </div>
            ))}
          {selectedApartment && (
            <div className="pr-6">
              <ApartmentCard
                apartment={selectedApartment}
                client={client}
                collectionClientLink={collectionClientLink}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const CollectionClientObjectsItem: FC<{
  apartment: ApartmentWithRelations;
  client: ClientWithRelations;
  onSelect: (apartment: ApartmentWithRelations) => void;
}> = ({ apartment, client, onSelect }) => {
  return (
    <Card
      onClick={() => onSelect(apartment)}
      className="cursor-pointer w-full mx-auto relative"
    >
      <CardContent className="flex max-sm:flex-col max-sm:gap-3 items-center">
        <div
          className={cn(
            "relative size-26 flex items-center justify-center rounded-lg overflow-hidden shrink-0",
          )}
        >
          {apartment.files?.[0] ? (
            <ApartmentFilesDialog
              files={apartment.files}
              title={apartment.title}
            />
          ) : (
            <div className="size-full flex items-center text-center justify-center text-muted-foreground bg-muted-foreground/10">
              <Ban />
            </div>
          )}
        </div>
        <div className="w-full px-4">
          {apartment.subtitle && (
            <Badge
              variant="secondary"
              className="mb-2 max-w-[6.25rem] block truncate text-[10px]"
            >
              {apartment.subtitle}
            </Badge>
          )}
          <ApartmentLikeButton
            size={"icon"}
            apartmentId={apartment.id}
            client={client}
            className="absolute top-2 right-2"
          />
          <CardTitle>
            <p className="line-clamp-1 leading-normal text-base text-blue-500">
              {apartment.title}
            </p>
          </CardTitle>

          {apartment.price && (
            <p className="font-semibold text-primary text-xl italic mt-1 line-clamp-2">
              {apartment.price}
            </p>
          )}
          {apartment.address && (
            <p className="line-clamp-2 text-sm mt-1 text-muted-foreground">
              {apartment.address}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
