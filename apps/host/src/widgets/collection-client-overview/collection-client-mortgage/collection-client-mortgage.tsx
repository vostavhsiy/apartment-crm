"use client";

import { Heading } from "@/shared/ui/heading";

import { CollectionClientMortgageCalculator } from "./collection-client-mortgage-calculator";
import { CollectionClientMortgageItems } from "./collection-client-mortgage-items";
import { useMortgageStore } from "./mortgage.store";

export const CollectionClientMortgage = () => {
  const { items, setItems } = useMortgageStore();

  return (
    <div className="w-full mortgage">
      <Heading className="text-muted-foreground max-md:text-lg mb-5">
        Ипотека
      </Heading>
      <div className="w-full flex max-md:flex-col rounded-lg bg-muted-foreground/5">
        <div className="w-1/4 max-md:w-full">
          <CollectionClientMortgageCalculator
            onAdding={(item) => {
              setItems([item, ...items]);
            }}
          />
        </div>
        <div className="w-3/4 max-md:w-full">
          <CollectionClientMortgageItems />
        </div>
      </div>
    </div>
  );
};
