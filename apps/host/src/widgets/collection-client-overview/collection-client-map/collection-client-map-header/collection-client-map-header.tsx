import { User } from "@/entities/user/model/user";
import { UserSocialMediaButton } from "@/features/user-social-media-button/user-social-media-button";
import { PublicRoutes } from "@/shared/config/routes/routes.public";
import Image from "next/image";

import { FC } from "react";

import {
  CollectionClientFilter,
  CollectionClientFilterType,
} from "../../collection-client-filter";
import { CollectionClientListMapToggle } from "../../collection-client-list-map-toggle";
import { CollectionClientMapHeaderFilterDrawer } from "./collection-client-map-header-filter-drawer";
import { CollectionClientMapHeaderMediaDrawer } from "./collection-client-map-header-media-drawer";

interface Props {
  user: User;
  collectionClientLinkId: string;
  filterValue: CollectionClientFilterType;
  setFilterValue: (value: CollectionClientFilterType) => void;
  totalCount: number;
  likesCount: number;
}

export const CollectionClientMapHeader: FC<Props> = ({
  user,
  collectionClientLinkId,
  filterValue,
  setFilterValue,
  totalCount,
  likesCount,
}) => {
  return (
    <header className="fixed z-100 top-0 left-0 w-full pointer-events-auto">
      <div className="max-w-[75rem] mx-auto flex items-center max-md:px-3 px-10 w-full h-20 bg-background rounded-b-4xl shadow-lg">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-6 relative">
            <div className="flex flex-col gap-2 w-full max-w-[19.75rem] max-md:max-w-[12.1875rem]">
              <div className="flex items-center gap-3 w-full">
                <Image
                  src={user.avatarUrl || "/logo.png"}
                  alt={user.name || "User Avatar"}
                  width={32}
                  height={32}
                  className="size-14 max-md:size-12 rounded-full object-cover"
                />
                <div className="flex flex-col max-w-[14.25rem] max-md:max-w-full">
                  <p className="truncate max-w-full max-md:text-xs">
                    {user.name}
                  </p>
                  <p className="truncate max-md:text-sm">{user.phone}</p>
                </div>
              </div>
            </div>
            <div className="max-md:hidden flex shrink-0 items-center gap-2 max-md:gap-5">
              <UserSocialMediaButton
                linkType="whatsapp"
                user={user}
                collectionLink={PublicRoutes.CLIENT_COLLECTION(
                  collectionClientLinkId,
                )}
                className="max-md:!size-12"
              />
              <UserSocialMediaButton
                linkType="telegram"
                user={user}
                collectionLink={PublicRoutes.CLIENT_COLLECTION(
                  collectionClientLinkId,
                )}
                className="max-md:!size-12"
              />
              <UserSocialMediaButton
                linkType="email"
                user={user}
                collectionLink={PublicRoutes.CLIENT_COLLECTION(
                  collectionClientLinkId,
                )}
                className="max-md:!size-12"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 md:hidden">
            <CollectionClientMapHeaderMediaDrawer
              user={user}
              collectionClientLinkId={collectionClientLinkId}
            />
            <CollectionClientMapHeaderFilterDrawer>
              <CollectionClientFilter
                fullInfo
                value={filterValue}
                onSelect={setFilterValue}
                likesCount={likesCount}
                totalCount={totalCount}
              />
            </CollectionClientMapHeaderFilterDrawer>
          </div>
          <div className="flex items-center gap-3 max-md:hidden">
            <CollectionClientListMapToggle
              collectionClientLinkId={collectionClientLinkId}
            />
            <CollectionClientFilter
              value={filterValue}
              onSelect={setFilterValue}
              likesCount={likesCount}
              totalCount={totalCount}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
