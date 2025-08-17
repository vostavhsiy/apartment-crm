"use client";

import { Toaster } from "@/shared/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { FC, ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

export const Providers: FC<Props> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
};
