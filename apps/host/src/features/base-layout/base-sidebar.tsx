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
} from "@/shared/ui/sidebar";

import { FC } from "react";

interface Props {
  sidebarGroups: SidebarGroupItem[];
}

export const BaseSidebar: FC<Props> = ({ sidebarGroups }) => {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="min-md:mt-header-height">
        {sidebarGroups.map((group, index) => {
          return (
            <SidebarGroup key={index}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item, index) => (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <a href={item.href}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};
