"use client";

import { ApartmentWithRelations } from "@/entities/apartment/model/apartment-with-relations";
import { Map, Placemark, useYMaps } from "@iminside/react-yandex-maps";

import { FC, useEffect, useState } from "react";

interface Props {
  apartment: ApartmentWithRelations;
}

export const ApartmentMap: FC<Props> = ({ apartment }) => {
  const ymaps = useYMaps(["geocode"]);

  const [coords, setCoords] = useState<number[] | null>([55.75, 37.57]);

  useEffect(() => {
    if (ymaps && apartment.address) {
      ymaps
        ?.geocode(apartment.address)
        .then((res) => {
          const firstGeoObject = res.geoObjects.get(0);
          if (firstGeoObject) {
            const coordinates = firstGeoObject.geometry?.getBounds();
            if (coordinates && coordinates[0]) {
              setCoords(coordinates[0]);
            }
          }
        })
        .catch(() => {
          setCoords(null);
        });
    }
  }, [ymaps, apartment.address]);

  if (!coords) return null;

  return (
    <div className="mb-8">
      <p className="text-xl font-semibold">Расположение</p>
      <p className="text-lg text-muted-foreground mb-5">{apartment.address}</p>
      <div className="w-[99%] mx-auto h-60 lg:h-96 bg-muted-foreground/50 rounded-lg overflow-hidden">
        <Map
          options={{
            copyrightLogoVisible: false,
            copyrightProvidersVisible: false,
            copyrightUaVisible: false,
            autoFitToViewport: "always",
          }}
          className="w-full h-60 lg:h-96 rounded-lg"
          state={{ center: coords, zoom: 18 }}
        >
          <Placemark geometry={coords} />
        </Map>
      </div>
    </div>
  );
};
