"use client";

import { Button } from "@/shared/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";
import { Settings2 } from "lucide-react";

import { FC, ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

export const CollectionClientMapHeaderFilterDrawer: FC<Props> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer direction="top" onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size={"icon"} variant={open ? "outline" : "default"}>
          <Settings2 />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="pt-25 pb-5 px-5">
        <DrawerTitle></DrawerTitle>
        {children}
        <div className="mx-auto w-1/3 bg-muted-foreground/30 h-2 rounded-full mt-10"></div>
      </DrawerContent>
    </Drawer>
  );
};
