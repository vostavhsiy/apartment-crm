"use client";

import { Button } from "@/shared/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";
import { Calculator } from "lucide-react";

import { FC, useState } from "react";

import { CollectionClientApartmentMortgageCalculator } from "./collection-client-apartment-mortgage-calculator";

interface Props {
  priceString?: string | null;
}

export const CollectionClientApartmentMortgageCalculatorDrawer: FC<Props> = ({
  priceString,
}) => {
  const [open, setOpen] = useState(false);

  const Slot = open ? DrawerClose : DrawerTrigger;

  return (
    <Drawer onOpenChange={setOpen}>
      <Slot asChild>
        <Button
          size={"icon"}
          className="size-12 rounded-full"
          variant={open ? "outline" : "default"}
        >
          <Calculator className="size-6" />
        </Button>
      </Slot>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
        </DrawerHeader>
        <div className="pb-5 px-5 h-full overflow-auto">
          <CollectionClientApartmentMortgageCalculator
            priceString={priceString}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
