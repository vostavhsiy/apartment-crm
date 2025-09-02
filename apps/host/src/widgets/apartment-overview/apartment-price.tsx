import { Apartment } from "@/entities/apartment/model/apartment";

import { FC } from "react";

interface Props {
  apartment: Apartment;
}
export const ApartmentPrice: FC<Props> = ({ apartment }) => {
  return (
    <div className="mb-8">
      <p className="text-xl font-semibold mb-5">Цена</p>
      <p className="bg-red-400 w-max px-4 py-1 text-white text-3xl lg:text-5xl italic font-bold">
        {apartment.price}
      </p>
    </div>
  );
};
