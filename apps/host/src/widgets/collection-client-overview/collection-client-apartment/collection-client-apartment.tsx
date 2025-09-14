"use client";

import { useFindApartment } from "@/entities/apartment/api/hooks";
import { ApartmentLikeButton } from "@/features/apartment-like-button/apartment-like-button";
import { UserSocialMediaButton } from "@/features/user-social-media-button/user-social-media-button";
import { PublicRoutes } from "@/shared/config/routes/routes.public";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/spinner";
import { ApartmentDescription } from "@/widgets/apartment-overview/apartment-description";
import { AparmentFeatures } from "@/widgets/apartment-overview/apartment-features";
import { ApartmentImages } from "@/widgets/apartment-overview/apartment-images";
import { ApartmentMap } from "@/widgets/apartment-overview/apartment-map";
import { ApartmentPrice } from "@/widgets/apartment-overview/apartment-price";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { FC } from "react";

import { CollectionClientApartmentMortgageCalculator } from "./collection-client-apartment-mortgage-calculator/collection-client-apartment-mortgage-calculator";
import { CollectionClientApartmentMortgageCalculatorDrawer } from "./collection-client-apartment-mortgage-calculator/collection-client-apartment-mortgage-calculator-drawer";

interface Props {
  apartmentId: string;
  clientId: string;
  collectionClientLinkId: string;
}

export const CollectionClientApartment: FC<Props> = ({
  apartmentId,
  clientId,
  collectionClientLinkId,
}) => {
  const router = useRouter();

  const { data: apartment, isPending: isApartmentPending } =
    useFindApartment(apartmentId);

  if (isApartmentPending) return <Spinner />;

  if (!apartment) return <Spinner />;

  const user = apartment.user;

  return (
    <div className="flex-1">
      <div className="flex items-center gap-10 justify-between mb-8 max-md:flex-col-reverse">
        <div className="flex items-center gap-3 max-md:flex-col max-md:items-start">
          <Button
            size={"icon"}
            variant={"outline"}
            className="rounded-full max-md:w-max max-md:px-3"
            onClick={() => router.back()}
          >
            <ChevronLeft />
            <span className="md:hidden">Назад</span>
          </Button>
          <div className="flex flex-col gap-1">
            <h1 className="text-xl lg:text-3xl font-bold">
              {apartment.title}{" "}
            </h1>
            {apartment.subtitle && (
              <p className="text-muted-foreground">{apartment.subtitle}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-8 max-md:gap-6 max-md:flex-col">
          <div className="flex flex-col gap-2 w-full max-w-[21.875rem]">
            <div className="flex items-center gap-3 w-full">
              <Image
                src={user.avatarUrl || "/logo.png"}
                alt={user.name || "User Avatar"}
                width={32}
                height={32}
                className="size-14 max-md:size-20 rounded-full object-cover"
              />
              <div className="flex flex-col max-w-[18.75rem] text-lg">
                <p className="truncate font-semibold">{user.name}</p>
                <p className="truncate">{user.phone}</p>
              </div>
            </div>
          </div>
          <div className="flex shrink-0 md:items-center flex-col gap-2 max-md:gap-5">
            <UserSocialMediaButton
              linkType="whatsapp"
              user={user}
              collectionLink={PublicRoutes.CLIENT_COLLECTION(
                collectionClientLinkId,
              )}
              className="!bg-background"
            />
            <UserSocialMediaButton
              linkType="telegram"
              user={user}
              collectionLink={PublicRoutes.CLIENT_COLLECTION(
                collectionClientLinkId,
              )}
              className="!bg-background"
            />
            <UserSocialMediaButton
              linkType="email"
              user={user}
              collectionLink={PublicRoutes.CLIENT_COLLECTION(
                collectionClientLinkId,
              )}
              className="!bg-background"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 max-md:grid-cols-1 gap-10">
        <div className="col-span-8">
          {apartment.files?.length > 0 && (
            <ApartmentImages apartment={apartment} showButtons />
          )}
          {apartment.price && <ApartmentPrice apartment={apartment} />}
          <div className="bg-background p-5 rounded-lg">
            {apartment.features?.length > 0 && (
              <AparmentFeatures apartment={apartment} />
            )}
            {apartment.address && <ApartmentMap apartment={apartment} />}
            {apartment.description && (
              <ApartmentDescription apartment={apartment} />
            )}
            <ApartmentLikeButton
              className="mt-8"
              apartment={apartment}
              clientId={clientId}
            />
          </div>
        </div>
        <div className="col-span-4 max-md:hidden">
          <ApartmentLikeButton
            className="mb-8"
            apartment={apartment}
            clientId={clientId}
          />
          <CollectionClientApartmentMortgageCalculator
            priceString={apartment.price}
          />
        </div>
      </div>
      <div className="fixed bottom-5 right-5 md:hidden">
        <CollectionClientApartmentMortgageCalculatorDrawer
          priceString={apartment.price}
        />
      </div>
      <div className="fixed bottom-5 left-5 md:hidden">
        <ApartmentLikeButton
          className="size-12 shadow-lg rounded-full"
          apartment={apartment}
          clientId={clientId}
          size={"icon"}
        />
      </div>
    </div>
  );
};
