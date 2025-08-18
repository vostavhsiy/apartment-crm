import { SidebarGroupItem } from "@/shared/lib/types";
import { FullScreenContainer } from "@/shared/ui/fullscreen-container";
import { SidebarProvider } from "@/shared/ui/sidebar";

import { FC, ReactNode } from "react";

import { BaseHeader } from "./base-header";
import { BaseSidebar } from "./base-sidebar";

interface Props {
  children: ReactNode;
  headerContentSlot: ReactNode;
  headerMobileContentSlot?: ReactNode;
  sidebarGroups?: SidebarGroupItem[];
}

export const BaseLayout: FC<Props> = ({
  children,
  headerContentSlot,
  headerMobileContentSlot,
  sidebarGroups,
}) => {
  return (
    <SidebarProvider>
      <FullScreenContainer className="flex flex-col">
        <BaseHeader
          contentSlot={headerContentSlot}
          mobileContentSlot={headerMobileContentSlot}
          withSidebar={!!sidebarGroups}
        />
        {sidebarGroups && <BaseSidebar sidebarGroups={sidebarGroups} />}
        <FullScreenContainer className="flex pt-header-height">
          <FullScreenContainer className="py-10 pt-6 px-5 flex items-center justify-center ">
            {children}
          </FullScreenContainer>
        </FullScreenContainer>
      </FullScreenContainer>
    </SidebarProvider>
  );
};
