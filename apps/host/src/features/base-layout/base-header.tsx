"use client";

import { SidebarTrigger } from "@/shared/ui/sidebar";

import { FC, ReactNode, useState } from "react";

import { MenuBurger } from "../menu/menu-burger";
import { MenuDrawer } from "../menu/menu-drawer";
import { cn } from '@/shared/lib/utils'

interface Props {
  contentSlot: ReactNode;
  mobileContentSlot?: ReactNode;
  withSidebar?: boolean;
}

export const BaseHeader: FC<Props> = ({
  contentSlot,
  mobileContentSlot,
  withSidebar,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <header className={cn("fixed z-50 top-0 left-0 w-full h-header-height py-2 px-5 flex items-center border-b bg-background/60 backdrop-blur-xs", withSidebar && "min-md:pl-14")}>
      <div className="h-full flex max-md:justify-between justify-center items-center gap-5 w-full max-w-5xl mx-auto">
        {contentSlot}
        {withSidebar && (
          <SidebarTrigger className="max-md:hidden absolute top-1/2 left-3 -translate-y-1/2 " />
        )}
        <div className="min-md:hidden">
          {!withSidebar ? (
            <MenuBurger open={open} setOpen={setOpen} />
          ) : (
            <SidebarTrigger />
          )}
        </div>
        {!withSidebar && (
          <MenuDrawer open={open} setOpen={setOpen}>
            {mobileContentSlot}
          </MenuDrawer>
        )}
      </div>
    </header>
  );
};
