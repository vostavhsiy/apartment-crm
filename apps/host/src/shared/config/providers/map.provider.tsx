"use client";

import { settings } from "@/shared/lib/env";
import { YMaps } from "@iminside/react-yandex-maps";

import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const MapProvider: FC<Props> = ({ children }) => {
  return (
    <YMaps
      query={{
        apikey: settings.YANDEX_MAPS_API_KEY,
      }}
    >
      {children}
    </YMaps>
  );
};
