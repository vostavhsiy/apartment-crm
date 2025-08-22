import { useGlobalStore } from "@/shared/lib/store/global.store";
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/dialog";

import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const GlobalPendingProvider: FC<Props> = ({ children }) => {
  const { isGlobalPending } = useGlobalStore();

  return (
    <>
      {children}
      <Dialog open={isGlobalPending}>
        <DialogTitle></DialogTitle>
        <DialogContent
          showCloseButton={false}
          className="flex flex-col items-center space-y-6 p-8 text-white bg-transparent border-0 outline-0 shadow-none"
        >
          <div className="relative">
            <div className="w-16 h-16 border-4 border-white/30 rounded-full animate-pulse-glow" />
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-white rounded-full animate-spin" />
          </div>

          <div className="text-center space-y-6">
            <p className="text-xl font-semibold">Не перезагружайте страницу</p>
            <div className="flex space-x-1 justify-center">
              <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
