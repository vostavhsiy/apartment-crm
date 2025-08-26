"use client";

import { AuthRoutes } from "@/shared/config/routes/routes.auth";
import { PublicRoutes } from "@/shared/config/routes/routes.public";
import { useIsMobile } from "@/shared/lib/hooks/use-mobile";
import { SidebarGroupItem } from "@/shared/lib/types";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/shared/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FC } from "react";

import { ActivationButton } from "../activation-button/activation-button";

interface Props {
  sidebarGroups: SidebarGroupItem[];
}

export const BaseSidebar: FC<Props> = ({ sidebarGroups }) => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { setOpenMobile } = useSidebar();

  const handleClick = () => {
    if (!isMobile) return;
    setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="min-md:mt-header-height">
        <SidebarTrigger className="min-md:hidden mt-3 ml-auto mr-5" />
        {sidebarGroups.map((group, index) => {
          return (
            <SidebarGroup key={index}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item, index) => {
                    const isActive =
                      pathname === item.href ||
                      (pathname.startsWith(item.href) &&
                        item.href !== PublicRoutes.HOME &&
                        item.href !== AuthRoutes.DASHBOARD);
                    return (
                      <SidebarMenuItem key={index}>
                        <SidebarMenuButton
                          isActive={isActive}
                          asChild
                          tooltip={item.title}
                          onClick={handleClick}
                        >
                          <Link href={item.href}>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
        <ActivationButton className="min-sm:hidden mx-auto mt-10" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};
