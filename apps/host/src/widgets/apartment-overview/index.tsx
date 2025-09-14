"use client";

import { useFindApartment } from "@/entities/apartment/api/hooks";
import { ApartmentLikeButton } from "@/features/apartment-like-button/apartment-like-button";
import { ApartmentToCollectionDialog } from "@/features/apartment-to-collection-dialog/apartment-to-collection-dialog";
import { AuthRoutes } from "@/shared/config/routes/routes.auth";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/spinner";
import { Edit } from "lucide-react";
import Link from "next/link";

import { FC } from "react";

import { ApartmentStats } from "../apartment-stats/apartment-stats";
import { ApartmentDescription } from "./apartment-description";
import { AparmentFeatures } from "./apartment-features";
import { ApartmentImages } from "./apartment-images";
import { ApartmentMap } from "./apartment-map";
import { ApartmentPrice } from "./apartment-price";

interface Props {
  apartmentId: string;
  clientId?: string;
  inAdmin?: boolean;
}

export const ApartmentOverview: FC<Props> = ({
  apartmentId,
  clientId,
  inAdmin,
}) => {
  const { data: apartment, isPending } = useFindApartment(apartmentId);

  if (isPending) {
    return <Spinner />;
  }

  if (!apartment) {
    return <Spinner />;
  }

  return (
    <div className="w-full">
      {inAdmin && (
        <>
          <ApartmentStats apartment={apartment} />
          <div className="flex items-start gap-3">
            <Button variant={"outline"} asChild className="mb-10">
              <Link href={AuthRoutes.DASHBOARD_APARTMENT_EDIT(apartment.id)}>
                <Edit /> Редактировать
              </Link>
            </Button>
            <ApartmentToCollectionDialog apartment={apartment} />
          </div>
        </>
      )}
      <h1 className="text-xl lg:text-5xl font-semibold mb-8">
        {apartment.title}
      </h1>
      {apartment.subtitle && (
        <p className="text-muted-foreground mb-4">{apartment.subtitle}</p>
      )}
      {apartment.files?.length > 0 && <ApartmentImages apartment={apartment} />}
      {apartment.price && <ApartmentPrice apartment={apartment} />}
      {apartment.features?.length > 0 && (
        <AparmentFeatures apartment={apartment} />
      )}
      {apartment.address && <ApartmentMap apartment={apartment} />}
      {apartment.description && <ApartmentDescription apartment={apartment} />}
      {clientId && (
        <div className="mt-5">
          <ApartmentLikeButton clientId={clientId} apartment={apartment} />
        </div>
      )}
    </div>
  );
};
