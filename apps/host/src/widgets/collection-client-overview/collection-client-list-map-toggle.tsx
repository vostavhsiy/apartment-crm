"use client";

import { PublicRoutes } from "@/shared/config/routes/routes.public";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { List, MapPin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FC } from "react";

interface Props {
  collectionClientLinkId: string;
}

export const CollectionClientListMapToggle: FC<Props> = ({
  collectionClientLinkId,
}) => {
  const pathname = usePathname();

  const isMap = pathname.startsWith(
    PublicRoutes.CLIENT_COLLECTION_MAP(collectionClientLinkId),
  );

  return (
    <div className="flex items-center gap-1 rounded-full p-1 bg-background shadow-lg">
      <Button
        variant={"ghost"}
        size={"icon"}
        className="w-12 rounded-full"
        asChild
      >
        <Link
          href={PublicRoutes.CLIENT_COLLECTION(collectionClientLinkId)}
          className={cn(!isMap && "bg-emerald-300 hover:bg-emerald-400")}
        >
          <List />
        </Link>
      </Button>
      <Button
        variant={"ghost"}
        size={"icon"}
        className="w-12 rounded-full"
        asChild
      >
        <Link
          href={PublicRoutes.CLIENT_COLLECTION_MAP(collectionClientLinkId)}
          className={cn(isMap && "bg-emerald-300 hover:bg-emerald-400")}
        >
          <MapPin />
        </Link>
      </Button>
    </div>
  );
};
