"use client";

import { useFindCollectionClientLink } from "@/entities/client/api/hooks";
import { UserSocialMediaButton } from "@/features/user-social-media-button/user-social-media-button";
import { PublicRoutes } from "@/shared/config/routes/routes.public";
import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FC } from "react";

export const NAV_ITENS = [
  {
    label: "Подбор",
    href: (id: string) => PublicRoutes.CLIENT_COLLECTION(id, true),
    text: `Отметьте лучшие квартиры кнопкой «Мне нравится»`,
  },
  {
    label: "Ипотека",
    href: (id: string) => PublicRoutes.CLIENT_COLLECTION_MORTGAGE(id),
    text: `Посчитайте условия оплаты для понравившихся объектов`,
  },
];

interface Props {
  collectionClientLinkId: string;
}

export const CollectionClientHeader: FC<Props> = ({
  collectionClientLinkId,
}) => {
  const pathname = usePathname();

  const { data: link, isPending } = useFindCollectionClientLink(
    collectionClientLinkId,
  );

  const user = link?.collection.user;

  const getActiveLink = () => {
    return NAV_ITENS.find(
      (item) =>
        pathname === item.href(collectionClientLinkId) ||
        (pathname.startsWith(item.href(collectionClientLinkId)) &&
          item.href(collectionClientLinkId) !==
            PublicRoutes.CLIENT_COLLECTION(collectionClientLinkId, true)),
    );
  };

  const activeLink = getActiveLink();

  return (
    <header className="w-full shrink-0 px-10">
      <div className="max-w-7xl mx-auto w-full pt-11">
        <div className="flex items-center justify-between gap-5 mb-12 max-md:flex-col-reverse max-md:gap-12">
          <div className="text-center">
            <h2 className="text-5xl font-bold">Выбирайте лучшее!</h2>
            <p className="min-md:hidden mt-5 text-xl">{activeLink?.text}</p>
          </div>
          {user && !isPending && (
            <div className="flex items-center gap-3 max-md:gap-6 max-md:flex-col">
              <div className="flex flex-col gap-2 w-full max-w-[19.75rem]">
                <div className="flex items-center gap-3 w-full">
                  <Image
                    src={user.avatarUrl || "/logo.png"}
                    alt={user.name || "User Avatar"}
                    width={32}
                    height={32}
                    className="size-14 max-md:size-20 rounded-full object-cover"
                  />
                  <div className="flex flex-col max-w-[14.25rem] max-md:text-lg">
                    <p className="truncate max-w-full">{user.name}</p>
                    <p className="truncate">{user.phone}</p>
                  </div>
                </div>
                <div className="max-md:hidden max-w-full ml-15 bg-background rounded-full  py-3 px-7 text-sm relative shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="17"
                    className="absolute left-0 top-0 text-white"
                  >
                    <path
                      fill="currentColor"
                      d="M.414.387C-1.408 9.042 4.5 15.065 7.68 16.995l9.399-.972c-.678-2.285-1.351-7.296 1.373-9.055C7.174 8.085 1.391 2.004.413.387Z"
                    ></path>
                  </svg>
                  {activeLink?.text}
                </div>
              </div>
              <div className="flex max-md:flex-row shrink-0 items-center flex-col gap-2 max-md:gap-5">
                <UserSocialMediaButton
                  linkType="whatsapp"
                  user={link.collection.user}
                  collectionLink={PublicRoutes.CLIENT_COLLECTION(
                    collectionClientLinkId,
                  )}
                  className="max-md:!size-12"
                />
                <UserSocialMediaButton
                  linkType="telegram"
                  user={link.collection.user}
                  collectionLink={PublicRoutes.CLIENT_COLLECTION(
                    collectionClientLinkId,
                  )}
                  className="max-md:!size-12"
                />
                <UserSocialMediaButton
                  linkType="email"
                  user={link.collection.user}
                  collectionLink={PublicRoutes.CLIENT_COLLECTION(
                    collectionClientLinkId,
                  )}
                  className="max-md:!size-12"
                />
              </div>
            </div>
          )}
          {!user && (
            <div className="flex gap-5 h-[8rem]">
              <Skeleton className="w-[19.75rem] h-full" />
              <Skeleton className="w-[2.25rem] h-full" />
            </div>
          )}
        </div>
        <nav className="flex items-center mt-5 bg-muted w-max rounded-t-md overflow-hidden">
          {NAV_ITENS.map((item) => (
            <Link
              key={item.label}
              href={item.href(collectionClientLinkId)}
              className={cn(
                "flex items-center justify-center py-2 px-5 h-12 border-b-2",
                activeLink?.label === item.label
                  ? "border-black bg-background font-medium"
                  : "text-muted-foreground border-transparent",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
