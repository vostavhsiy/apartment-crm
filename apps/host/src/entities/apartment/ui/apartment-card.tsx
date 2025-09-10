import { FindCollectionLinkResponse } from "@/entities/client/api/api";
import { ClientWithRelations } from "@/entities/client/model/client-with-relations";
import { ApartmentFilesDialog } from "@/features/apartment-files-dialog/apartment-files-dialog";
import { ApartmentLikeButton } from "@/features/apartment-like-button/apartment-like-button";
import { PublicRoutes } from "@/shared/config/routes/routes.public";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardTitle } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { Ban } from "lucide-react";
import Link from "next/link";

import { FC } from "react";

import { ApartmentWithRelations } from "../model/apartment-with-relations";

interface Props {
  apartment: ApartmentWithRelations;
  collectionClientLink: FindCollectionLinkResponse;
  client: ClientWithRelations;
}

export const ApartmentCard: FC<Props> = ({
  apartment,
  collectionClientLink,
  client,
}) => {
  return (
    <Card className="w-full max-w-md mx-auto pt-0 shadow-lg">
      <CardContent className="h-full px-0 flex flex-col gap-10 justify-between">
        <div>
          <div
            className={cn(
              "relative w-full aspect-video flex items-center justify-center rounded-lg overflow-hidden shrink-0 border-b mb-4",
            )}
          >
            {apartment.files?.[0] ? (
              <ApartmentFilesDialog
                previewSlider
                showButtons
                files={apartment.files}
                title={apartment.title}
              />
            ) : (
              <div className="size-full flex items-center text-center justify-center text-muted-foreground bg-muted-foreground/10">
                <Ban />
              </div>
            )}
          </div>
          <Link
            href={PublicRoutes.CLIENT_APARTMENT(
              collectionClientLink.id,
              apartment.id,
            )}
            className="block px-4"
          >
            {apartment.subtitle && (
              <Badge className="mb-3">{apartment.subtitle}</Badge>
            )}
            <CardTitle className="line-clamp-2 text-lg">
              {apartment.title}
            </CardTitle>
            {apartment.price && (
              <p className="font-semibold text-primary italic mt-2 line-clamp-2">
                {apartment.price}
              </p>
            )}
            {apartment.address && (
              <p className="text-sm mt-2 text-muted-foreground line-clamp-2">
                {apartment.address}
              </p>
            )}
            <p className="text-blue-700 mt-3">Посмотреть подробнее</p>
          </Link>
        </div>

        <div className="w-full flex flex-col items-center gap-5 px-4">
          <ApartmentLikeButton apartmentId={apartment.id} client={client} />
        </div>
      </CardContent>
    </Card>
  );
};

export const ApartmentCardSkeleton = () => {
  return <Skeleton className="rounded-xl h-[25rem]" />;
};
