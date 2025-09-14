"use client";

import { User } from "@/entities/user/model/user";
import { UserSocialMediaButton } from "@/features/user-social-media-button/user-social-media-button";
import { PublicRoutes } from "@/shared/config/routes/routes.public";
import { Button } from "@/shared/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";
import { MessageCircleMore } from "lucide-react";

import { FC, useState } from "react";

interface Props {
  user: User;
  collectionClientLinkId: string;
}

export const CollectionClientMapHeaderMediaDrawer: FC<Props> = ({
  user,
  collectionClientLinkId,
}) => {
  const [open, setOpen] = useState(false);

  const Slot = open ? DrawerClose : DrawerTrigger;

  return (
    <Drawer direction="top" onOpenChange={setOpen}>
      <Slot asChild>
        <Button size={"icon"} variant={open ? "outline" : "default"}>
          <MessageCircleMore />
        </Button>
      </Slot>
      <DrawerContent className="pt-30 pb-5 px-5">
        <DrawerTitle></DrawerTitle>
        <div className="flex flex-col gap-2">
          <UserSocialMediaButton
            linkType="whatsapp"
            user={user}
            collectionLink={PublicRoutes.CLIENT_COLLECTION(
              collectionClientLinkId,
            )}
          />
          <UserSocialMediaButton
            linkType="telegram"
            user={user}
            collectionLink={PublicRoutes.CLIENT_COLLECTION(
              collectionClientLinkId,
            )}
          />
          <UserSocialMediaButton
            linkType="email"
            user={user}
            collectionLink={PublicRoutes.CLIENT_COLLECTION(
              collectionClientLinkId,
            )}
          />
        </div>
        <div className="mx-auto w-1/3 bg-muted-foreground/30 h-2 rounded-full mt-10"></div>
      </DrawerContent>
    </Drawer>
  );
};
