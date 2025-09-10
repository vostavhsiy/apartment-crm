"use client";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Heart, House } from "lucide-react";

import { FC } from "react";

export type CollectionClientFilterType = "all" | "likes";

interface Props {
  value: CollectionClientFilterType;
  onSelect: (value: CollectionClientFilterType) => void;
  totalCount?: number;
  likesCount?: number;
  fullInfo?: boolean;
}

export const CollectionClientFilter: FC<Props> = ({
  value,
  onSelect,
  totalCount,
  likesCount,
  fullInfo,
}) => {
  const handleSelect = (newValue: CollectionClientFilterType) => {
    onSelect(newValue);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full p-1 bg-background shadow-lg",
        fullInfo && "flex-col rounded-md py-2 gap-3",
      )}
    >
      <Button
        variant={"ghost"}
        size={"icon"}
        className={cn(
          "w-16 rounded-full",
          fullInfo && "w-full flex justify-between px-5 h-12 bg-muted",
          value === "all" && "bg-emerald-300 hover:bg-emerald-400",
        )}
        onClick={() => handleSelect("all")}
      >
        {fullInfo ? (
          <>
            <span className="flex items-center gap-3">
              <House />
              Все объекты
            </span>
            <span>{totalCount || 0}</span>
          </>
        ) : (
          <>
            <House />
            <span>{totalCount || 0}</span>
          </>
        )}
      </Button>
      <Button
        variant={"ghost"}
        size={"icon"}
        className={cn(
          "w-16 rounded-full",
          fullInfo && "w-full flex justify-between px-5 h-12 bg-muted",
          value === "likes" && "bg-emerald-300 hover:bg-emerald-400",
        )}
        onClick={() => handleSelect("likes")}
      >
        {fullInfo ? (
          <>
            <span className="flex items-center gap-3">
              <Heart />
              Понравились
            </span>
            <span> {likesCount || 0}</span>
          </>
        ) : (
          <>
            <Heart />
            <span>{likesCount || 0}</span>
          </>
        )}
      </Button>
    </div>
  );
};
