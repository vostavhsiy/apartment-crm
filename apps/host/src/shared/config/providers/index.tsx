"use client";

import { Toaster } from "@/shared/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { FC, ReactNode, useState } from "react";

import { ThemeProvider } from "./theme.provider";

interface Props {
  children: ReactNode;
}

export const Providers: FC<Props> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
