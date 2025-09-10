import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Minus, Plus } from "lucide-react";

import { FC } from "react";

interface Props {
  mapInstance: ymaps.Map;
  className?: string;
}

export const CollectionClientMapZoomControl: FC<Props> = ({
  mapInstance,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1 rounded-full p-1 bg-background shadow-lg fixed top-1/2 -translate-y-1/2 left-5 z-[5]",
        className,
      )}
    >
      <Button
        variant={"ghost"}
        size={"icon"}
        className="rounded-full hover:bg-emerald-400"
        onClick={() =>
          mapInstance.setZoom(mapInstance.getZoom() + 1, {
            useMapMargin: true,
            checkZoomRange: true,
          })
        }
      >
        <Plus />
      </Button>
      <Button
        variant={"ghost"}
        size={"icon"}
        className="rounded-full hover:bg-emerald-400"
        onClick={() =>
          mapInstance.setZoom(mapInstance.getZoom() - 1, {
            useMapMargin: true,
            checkZoomRange: true,
          })
        }
      >
        <Minus />
      </Button>
    </div>
  );
};
