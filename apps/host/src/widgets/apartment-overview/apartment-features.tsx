"use client";

import { ApartmentWithRelations } from "@/entities/apartment/model/apartment-with-relations";

import { FC, useState } from "react";

interface Props {
  apartment: ApartmentWithRelations;
}

export const AparmentFeatures: FC<Props> = ({ apartment }) => {
  const [features] = useState<Array<{ name: string; value: string }>>(() => {
    try {
      return apartment.features
        ? apartment.features.map((feat) => ({
            name: feat.name,
            value: feat.value,
          }))
        : [];
    } catch (error) {
      return [];
    }
  });
  return (
    <div className="mb-8">
      <p className="text-xl font-semibold">О объекте</p>
      {features.length > 0 ? (
        <ul className="mt-4">
          {features.map((feature, index) => (
            <li
              key={index}
              className="max-w-full pb-3 overflow-hidden text-ellipsis"
            >
              <span className="text-muted-foreground">{feature.name}:</span>{" "}
              {feature.value}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-muted-foreground">No features available</div>
      )}
    </div>
  );
};
