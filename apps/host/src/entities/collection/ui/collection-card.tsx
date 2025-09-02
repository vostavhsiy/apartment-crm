import { AuthRoutes } from "@/shared/config/routes/routes.auth";
import { wordEnding } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardTitle } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { Edit } from "lucide-react";
import Link from "next/link";

import { CollectionWithRelations } from "../model/collection-with-relations";

interface Props {
  collection: CollectionWithRelations;
}

export const CollectionCard = ({ collection }: Props) => {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardContent className="flex max-sm:flex-col max-sm:gap-3 items-center">
        <div className="w-full">
          <CardTitle className="line-clamp-1 mb-3 leading-normal max-w-[12.5rem] lg:max-w-[80%]">
            <Link href={AuthRoutes.DASHBOARD_COLLECTION(collection.id)}>
              {collection.title}
            </Link>
          </CardTitle>
          {collection.apartmentsLinks.length}{" "}
          {wordEnding(collection.apartmentsLinks.length, [
            "объект",
            "объекта",
            "объектов",
          ])}
        </div>
        <div className="shrink-0 w-max flex flex-col lg:flex-row items-center gap-2">
          <Button asChild variant={"outline"}>
            <Link href={AuthRoutes.DASHBOARD_COLLECTION_EDIT(collection.id)}>
              <Edit /> Редактировать
            </Link>
          </Button>
          <Button
            asChild
            variant={"secondary"}
            className="cursor-pointer w-full lg:w-max"
          >
            <Link href={AuthRoutes.DASHBOARD_COLLECTION(collection.id)}>
              Подробнее
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const CollectionCardSkeleton = () => {
  return <Skeleton className="rounded-xl h-28 max-sm:h-[12.5rem]" />;
};
