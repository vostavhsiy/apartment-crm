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
              className="max-w-full pb-3 flex items-baseline before:block before:grow-1 before:order-1 before:border-b before:border-dashed before:border-muted-foreground before:min-w-10 max-md:text-sm"
            >
              <span className="text-muted-foreground shrink-0">
                {feature.name}
              </span>{" "}
              <span className="order-2">{feature.value}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-muted-foreground mt-2">
          Нет доступных характеристик.
        </div>
      )}
    </div>
  );
};
