"use client";

import { Button } from "@/shared/ui/button";
import {
  Drawer,
  DrawerClose,
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

  const Slot = open ? DrawerClose : DrawerTrigger;

  return (
    <Drawer direction="top" open={open} onOpenChange={setOpen}>
      <Slot asChild>
        <Button size={"icon"} variant={open ? "outline" : "default"}>
          <Settings2 />
        </Button>
      </Slot>
      <DrawerContent className="pt-25 pb-5 px-5">
        <DrawerTitle></DrawerTitle>
        <div onClick={() => setOpen(false)}>{children}</div>
        <div className="mx-auto w-1/3 bg-muted-foreground/30 h-2 rounded-full mt-10"></div>
      </DrawerContent>
    </Drawer>
  );
};
