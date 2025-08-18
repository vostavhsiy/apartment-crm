import { LucideProps } from "lucide-react";

import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface SidebarItem {
  title: string;
  href: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}
export interface SidebarGroupItem {
  title: string;
  items: SidebarItem[];
}
