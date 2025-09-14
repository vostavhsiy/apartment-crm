"use client";

import { useFindAllApartmentsForCollection } from "@/entities/apartment/api/hooks";
import { ApartmentWithRelations } from "@/entities/apartment/model/apartment-with-relations";
import { FindCollectionLinkResponse } from "@/entities/client/api/api";
import { useFindClient } from "@/entities/client/api/hooks";
import { PublicRoutes } from "@/shared/config/routes/routes.public";
import { MOBILE_BREAKPOINT } from "@/shared/lib/hooks/use-mobile";
import { getMapBounds, isInMapBounds } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { FullScreenContainer } from "@/shared/ui/fullscreen-container";
import { Spinner } from "@/shared/ui/spinner";
import { Map, useYMaps } from "@iminside/react-yandex-maps";
import { List } from "lucide-react";
import Link from "next/link";

import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { CollectionClientFilterType } from "../collection-client-filter";
import { CollectionClientMapHeader } from "./collection-client-map-header/collection-client-map-header";
import { CollectionClientMapObjects } from "./collection-client-map-objects";
import {
  CollectionClientMapPlacemark,
  PlacemarkInfo,
} from "./collection-client-map-placemark";
import { CollectionClientMapZoomControl } from "./collection-client-map-zoom-control";

interface Props {
  collectionClientLink: FindCollectionLinkResponse;
}

const filterApartments = (
  apartment: ApartmentWithRelations,
  clientId: string,
  apartmentsFilter: CollectionClientFilterType,
) =>
  apartmentsFilter === "all"
    ? true
    : apartment?.clientsLikes?.some((like) => like.clientId === clientId);

export const CollectionClientMap: FC<Props> = ({ collectionClientLink }) => {
  const { data: apartments, isPending: isApartmentsPending } =
    useFindAllApartmentsForCollection(collectionClientLink.collectionId);

  const { data: client, isPending: isClientPending } = useFindClient(
    collectionClientLink.clientId,
  );

  const [selectedApartment, setSelectedApartment] =
    useState<ApartmentWithRelations | null>(null);

  const ymaps = useYMaps([
    "geocode",
    "templateLayoutFactory",
    "layout.ImageWithContent",
  ]);
  const mapRef = useRef<ymaps.Map | undefined>(undefined);

  const [coordsArray, setCoordsArray] = useState<Array<PlacemarkInfo> | null>(
    null,
  );

  const [isZoomFar, setIsZoomFar] = useState(false);

  const [apartmentsFilter, setApartmentsFilter] =
    useState<CollectionClientFilterType>("all");

  useEffect(() => {
    if (ymaps && apartments && apartments?.length > 0) {
      const result = Promise.all(
        apartments.map((apartment) => {
          if (!apartment.address) Promise.resolve(null);
          return new Promise<PlacemarkInfo | null>((resolve) => {
            if (!apartment.address) return resolve(null);
            ymaps
              ?.geocode(apartment.address)
              .then((res) => {
                const firstGeoObject = res.geoObjects.get(0);
                if (firstGeoObject) {
                  const coordinates = firstGeoObject.geometry?.getBounds();
                  if (coordinates && coordinates[0]) {
                    resolve({
                      apartmentId: apartment.id,
                      coords: coordinates[0],
                      isInView: true,
                    });
                  } else {
                    resolve(null);
                  }
                } else {
                  resolve(null);
                }
              })
              .catch(() => {
                resolve(null);
              });
          });
        }),
      );
      result.then((coords) => {
        setCoordsArray(coords.filter((coord) => coord !== null));
      });
    }
  }, [ymaps, apartments?.length]);

  const handleBoundsChange = useCallback(() => {
    if (mapRef.current && coordsArray && coordsArray.length > 0) {
      const bounds = mapRef.current.getBounds();

      const updatedPlacemarks = coordsArray.map((placemark) => {
        return {
          ...placemark,
          isInView: bounds ? isInMapBounds(placemark.coords, bounds) : false,
        };
      });

      setCoordsArray(updatedPlacemarks);

      const zoom = mapRef.current.getZoom();

      setIsZoomFar(!!(zoom && zoom < 5));
    }
  }, [mapRef.current, coordsArray]);

  const defaultMapState = useMemo(
    () =>
      coordsArray
        ? {
            bounds: getMapBounds(coordsArray.map((item) => item.coords)),
            margin: [0, window.innerWidth <= MOBILE_BREAKPOINT ? 0 : 200, 0, 0],
          }
        : {
            center: [55.75, 37.57] as [number, number],
            zoom: 10,
          },
    [coordsArray],
  );

  if (isApartmentsPending || isClientPending || !coordsArray || !client)
    return <Spinner />;

  const totalCount = apartments?.length || 0;

  const likesCount =
    apartments?.filter((apartment) =>
      apartment.clientsLikes?.some(
        (like) => like.clientId === collectionClientLink.clientId,
      ),
    ).length || 0;

  return (
    <FullScreenContainer className="bg-muted-foreground/50 overflow-hidden">
      <Button
        variant={"outline"}
        size={"lg"}
        className="md:hidden fixed z-10 bottom-22 left-[5%] rounded-full"
        asChild
      >
        <Link href={PublicRoutes.CLIENT_COLLECTION(collectionClientLink.id)}>
          <List />
          Список
        </Link>
      </Button>
      <CollectionClientMapHeader
        user={collectionClientLink.collection.user}
        collectionClientLinkId={collectionClientLink.id}
        filterValue={apartmentsFilter}
        setFilterValue={setApartmentsFilter}
        likesCount={likesCount}
        totalCount={totalCount}
      />
      <CollectionClientMapObjects
        selectedApartment={selectedApartment}
        setSelectedApartment={setSelectedApartment}
        apartments={
          apartments
            ?.filter((apartment) =>
              coordsArray.some(
                (coord) => coord.isInView && coord.apartmentId === apartment.id,
              ),
            )
            .filter((a) =>
              filterApartments(
                a,
                collectionClientLink.clientId,
                apartmentsFilter,
              ),
            ) || []
        }
        client={client}
        collectionClientLink={collectionClientLink}
      />
      {mapRef.current && (
        <CollectionClientMapZoomControl mapInstance={mapRef.current} />
      )}
      <Map
        options={{
          copyrightLogoVisible: false,
          copyrightProvidersVisible: false,
          copyrightUaVisible: false,
          autoFitToViewport: "always",
        }}
        className="size-full"
        defaultState={defaultMapState}
        instanceRef={mapRef}
        modules={[
          "Map",
          "templateLayoutFactory",
          "layout.ImageWithContent",
          "geoObject.addon.balloon",
          "geoObject.addon.hint",
        ]}
        onLoad={handleBoundsChange}
        onBoundsChange={handleBoundsChange}
      >
        {coordsArray
          .filter((placemark) =>
            filterApartments(
              apartments?.find(
                (apartment) => apartment.id === placemark.apartmentId,
              )!,
              collectionClientLink.clientId,
              apartmentsFilter,
            ),
          )
          .map((placemark) => {
            const apartment = apartments?.find(
              (ap) => ap.id === placemark.apartmentId,
            );
            return (
              <CollectionClientMapPlacemark
                key={placemark.apartmentId}
                placemark={placemark}
                apartment={apartment}
                isZoomFar={isZoomFar}
                setSelectedApartment={setSelectedApartment}
              />
            );
          })}
      </Map>
    </FullScreenContainer>
  );
};
