"use client";

import { ApartmentWithRelations } from "@/entities/apartment/model/apartment-with-relations";
import { Placemark, useYMaps } from "@iminside/react-yandex-maps";

import { FC } from "react";

export interface PlacemarkInfo {
  apartmentId: string;
  coords: number[];
  isInView?: boolean;
}

interface Props {
  placemark: PlacemarkInfo;
  apartment?: ApartmentWithRelations;
  setSelectedApartment: (apartment: ApartmentWithRelations | null) => void;
  isZoomFar: boolean;
}

export const CollectionClientMapPlacemark: FC<Props> = ({
  placemark,
  apartment,
  setSelectedApartment,
  isZoomFar,
}) => {
  const ymaps = useYMaps(["templateLayoutFactory", "layout.ImageWithContent"]);

  return (
    <Placemark
      onClick={() => {
        setSelectedApartment(apartment || null);
      }}
      geometry={placemark.coords}
      properties={{
        hintContent: `
				<div class="map-hint relative bg-white pb-2 w-[12.5rem] overflow-hidden rounded-md shadow-lg" style="font-family: Inter, Inter Fallback;">
            <div class="w-full h-[6.25rem] mb-1 bg-muted">
              ${apartment?.files[0] ? `<img class="size-full object-cover object-center" src="${apartment.files[0].url}" />` : ""}
            </div>
            <div class="px-2">
              <span class="block truncate font-semibold text-xl text-black">${apartment?.price || apartment?.title}</span>
              <span>${apartment?.subtitle || ""}</span>
            </div>
        </div>`,
      }}
      options={{
        iconLayout: "default#imageWithContent",
        iconContentLayout: ymaps?.templateLayoutFactory.createClass(
          `<div class="relative bg-gradient-to-r from-amber-500 to-pink-500 rounded-full border-3 border-white py-1 px-1 ${isZoomFar ? "h-full" : ""}">
            ${
              !isZoomFar
                ? `                       
              <span class="line-clamp-1 font-semibold text-white">${apartment?.price || apartment?.title}</span>
              <div class="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full bg-inherit">
              	<div class="w-0 h-0 border-l-12 border-r-12 border-t-12 border-l-transparent border-r-transparent border-t-white"></div>
              </div>
              <div class="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full bg-inherit">
                <div class="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-pink-500"></div>
              </div>`
                : ""
            }
          </div>`,
        ),
        iconContentSize: !isZoomFar ? [100, 32] : [20, 20],
        iconImageSize: [0, 0],
        iconOffset: !isZoomFar ? [-50, 0] : [-10, 0],
        iconShape: {
          type: "Rectangle",
          //@ts-ignore
          coordinates: [[0, 0], !isZoomFar ? [100, 32] : [20, 20]],
        },
      }}
    />
  );
};
