import { SidebarGroupItem } from "@/shared/lib/types";
import { FullScreenContainer } from "@/shared/ui/fullscreen-container";
import { SidebarProvider } from "@/shared/ui/sidebar";

import { FC, Fragment, ReactNode } from "react";

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
  const Provider = sidebarGroups ? SidebarProvider : Fragment;

  return (
    <Provider>
      <BaseHeader
        contentSlot={headerContentSlot}
        mobileContentSlot={headerMobileContentSlot}
        withSidebar={!!sidebarGroups}
      />
      {sidebarGroups && <BaseSidebar sidebarGroups={sidebarGroups} />}
      <FullScreenContainer className="flex flex-col pt-header-height">
        <FullScreenContainer className="py-10 pt-6 px-5 flex items-center justify-center w-full max-w-7xl mx-auto">
          {children}
        </FullScreenContainer>
      </FullScreenContainer>
    </Provider>
  );
};
