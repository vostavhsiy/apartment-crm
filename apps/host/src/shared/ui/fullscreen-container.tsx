import { ReactNode } from "react";

import { cn } from "../lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
}

export const FullScreenContainer = ({ children, className }: Props) => {
  return <div className={cn("grow", className)}>{children}</div>;
};
