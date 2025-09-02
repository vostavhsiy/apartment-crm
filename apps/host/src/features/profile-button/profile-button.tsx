"use client";

import { UserWithRelations } from "@/entities/user/model/user-with-relations";
import { AuthRoutes } from "@/shared/config/routes/routes.auth";
import { getInitials } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  Bell,
  BellDot,
  Building2,
  House,
  Rows4,
  Settings,
  UserSquare,
} from "lucide-react";
import Link from "next/link";

import { FC } from "react";

import { SignOutButton } from "../sign-out-button/sign-out-button";

interface Props {
  profile: UserWithRelations;
}

export const ProfileButton: FC<Props> = ({ profile }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer relative">
        <button>
          <Avatar className="size-10 overflow-auto border border-primary/20">
            <AvatarImage src={profile.avatarUrl || undefined} />
            <AvatarFallback className="font-semibold">
              {getInitials(profile.email)}
            </AvatarFallback>
          </Avatar>
          {profile.notifications.length > 0 && (
            <Badge
              className="absolute -translate-y-1/3 translate-x-1/3 top-0 right-0 h-5 min-w-5 rounden-full px-1 font-mono tabular-nums"
              variant="destructive"
            >
              {profile.notifications.length < 99
                ? profile.notifications.length
                : "99+"}
            </Badge>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-3xs">
        <DropdownMenuLabel className="flex flex-col text-center">
          <span className="truncate">{profile.email}</span>
          {profile.name && (
            <span className="mt-1 truncate font-normal text-primary/70">
              {profile.name}
            </span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="flex items-center">
          <Link href={AuthRoutes.PROFILE_SETTINGS}>
            <Settings />
            <span>Настройки профиля</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={AuthRoutes.DASHBOARD}>
            <Building2 />
            <span>Панель управления</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="flex items-center">
          <Link href={AuthRoutes.COLLECTIONS}>
            <Rows4 />
            <span>Подборки</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={AuthRoutes.APARTMENTS}>
            <House />
            <span>Объекты</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={AuthRoutes.CLIENTS}>
            <UserSquare />
            <span>Клиенты</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={AuthRoutes.NOTIFICATIONS}>
            {profile.notifications.length > 0 ? <BellDot /> : <Bell />}
            <span>
              Уведомления{" "}
              {profile.notifications.length > 0 && (
                <Badge
                  className="-translate-y-0.5 ml-2 h-5 min-w-5 rounden-full px-1 font-mono tabular-nums"
                  variant="destructive"
                >
                  {profile.notifications.length < 99
                    ? profile.notifications.length
                    : "99+"}
                </Badge>
              )}
            </span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
