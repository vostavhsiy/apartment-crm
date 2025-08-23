import { ReactNode } from "react";

import { cn } from "../lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
}

export const FullScreenContainer = ({ children, className }: Props) => {
  return <div className={cn("flex-1", className)}>{children}</div>;
};
