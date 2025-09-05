import { ApartmentFilesDialog } from "@/features/apartment-files-dialog/apartment-files-dialog";
import { ApartmentToCollectionDialog } from "@/features/apartment-to-collection-dialog/apartment-to-collection-dialog";
import { AuthRoutes } from "@/shared/config/routes/routes.auth";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardTitle } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { Ban, Edit, Heart, House } from "lucide-react";
import Link from "next/link";

import { FC } from "react";

import { ApartmentWithRelations } from "../model/apartment-with-relations";

interface Props {
  apartment: ApartmentWithRelations;
  isInAdminPage?: boolean;
  isInClientPage?: boolean;
  isLiked?: boolean;
  isSeen?: boolean;
}

export const ApartmentRowCard: FC<Props> = ({
  apartment,
  isInAdminPage,
  isInClientPage,
  isLiked,
  isSeen,
}) => {
  return (
    <Card className="w-full mx-auto">
      <CardContent className="flex max-sm:flex-col max-sm:gap-3 items-center">
        <div
          className={cn(
            "relative size-32 flex items-center justify-center rounded-lg overflow-hidden shrink-0",
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
          <CardTitle>
            <Link
              className="line-clamp-2 leading-normal text-lg text-blue-500"
              href={AuthRoutes.DASHBOARD_APARTMENT(apartment.id)}
            >
              {apartment.title}
            </Link>
          </CardTitle>
          {apartment.subtitle && (
            <Badge
              variant="secondary"
              className="mt-2 whitespace-normal line-clamp-2"
            >
              {apartment.subtitle}
            </Badge>
          )}
          {apartment.price && (
            <p className="font-semibold text-primary italic mt-2 line-clamp-2">
              {apartment.price}
            </p>
          )}
          {apartment.address && (
            <p className="text-sm mt-1 text-muted-foreground line-clamp-3">
              {apartment.address}
            </p>
          )}
        </div>
        <div
          className={cn(
            "shrink-0 flex flex-col lg:flex-row items-center gap-2 mt-4 px-4",
            isInAdminPage ? "justify-between" : "justify-end",
          )}
        >
          {isInAdminPage && (
            <div>
              <Button asChild variant={"outline"}>
                <Link href={AuthRoutes.DASHBOARD_APARTMENT_EDIT(apartment.id)}>
                  <Edit /> Редактировать
                </Link>
              </Button>
            </div>
          )}
          <div className="w-full lg:w-max flex flex-col lg:flex-row items-center gap-2">
            {!isInClientPage && (
              <ApartmentToCollectionDialog apartment={apartment} />
            )}
            {isInClientPage && (
              <>
                {isLiked && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-500"
                        size={"icon"}
                      >
                        <Heart fill="red" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Объект пронравился клиенту</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      disabled={isSeen}
                      className={cn(!isSeen && "opacity-50")}
                      variant="outline"
                      size={"icon"}
                    >
                      <House />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {isSeen
                        ? "Клиент смотрел объект"
                        : "Клиент не смотрел объект"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </>
            )}
            <Button
              asChild
              variant={"secondary"}
              className="cursor-pointer w-full lg:w-max"
            >
              <Link href={AuthRoutes.DASHBOARD_APARTMENT(apartment.id)}>
                Подробнее
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const ApartmentRowCardSkeleton = () => {
  return <Skeleton className="rounded-xl h-44 max-sm:h-[28rem]" />;
};
