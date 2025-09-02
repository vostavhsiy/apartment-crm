"use client";

import { useProfile } from "@/entities/user/api/hooks";
import { ActivationButton } from "@/features/activation-button/activation-button";
import { BaseLayout } from "@/features/base-layout/base-layout";
import { Logo } from "@/features/logo/logo";
import { ProfileButton } from "@/features/profile-button/profile-button";
import { SignInButton } from "@/features/sign-in-button/sign-in-button";
import { ThemeButton } from "@/features/theme-button/theme-button";
import { AuthRoutes } from "@/shared/config/routes/routes.auth";
import { PublicRoutes } from "@/shared/config/routes/routes.public";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import {
  Bell,
  BellDot,
  Building2,
  ChartArea,
  MessageCircle,
  Rows4,
  SquarePlus,
  User,
  UserSquare,
} from "lucide-react";
import Link from "next/link";

import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const DashboardPagesLayout: FC<Props> = ({ children }) => {
  const { data: profile, isLoading } = useProfile();

  return (
    <BaseLayout
      headerContentSlot={
        <>
          <div className="w-full h-full flex items-center gap-5 justify-between">
            <Link
              href={PublicRoutes.HOME}
              className="h-full flex gap-2 items-center "
            >
              <Logo className="h-full" />
              <Button className="max-md:hidden text-lg" variant={"ghost"}>
                Aparment CRM
              </Button>
            </Link>
            {isLoading && (
              <div className="flex items-center gap-5">
                <Skeleton className="size-9" />
                <Skeleton className="size-9" />
                <Skeleton className="size-10 rounded-full" />
              </div>
            )}
            {!isLoading && !profile && (
              <div className="flex items-center gap-5">
                <ThemeButton />
                <SignInButton />
              </div>
            )}
            {!isLoading && profile && (
              <div className="flex items-center gap-5">
                <ActivationButton className="max-sm:hidden" />
                <Button asChild size={"icon"} variant={"outline"}>
                  <Link href={AuthRoutes.CREATE_COLLECTION}>
                    <SquarePlus className="size-5" />
                  </Link>
                </Button>
                <ThemeButton />
                <ProfileButton profile={profile} />
              </div>
            )}
          </div>
        </>
      }
      sidebarGroups={[
        {
          title: "Apartment CRM",
          items: [
            {
              title: "Обзор",
              href: AuthRoutes.DASHBOARD,
              icon: ChartArea,
            },
          ],
        },
        {
          title: "Панель управления",
          items: [
            {
              title: "Подборки",
              href: AuthRoutes.COLLECTIONS,
              icon: Rows4,
            },
            {
              title: "Объекты",
              href: AuthRoutes.APARTMENTS,
              icon: Building2,
            },
            {
              title: "Клиенты",
              href: AuthRoutes.CLIENTS,
              icon: UserSquare,
            },
          ],
        },
        {
          title: "Еще",
          items: [
            {
              title: "Настройки профиля",
              href: AuthRoutes.PROFILE_SETTINGS,
              icon: User,
            },
            {
              title: "Уведомления",
              href: AuthRoutes.NOTIFICATIONS,
              icon: !profile?.notifications?.length ? Bell : BellDot,
              notifications: profile?.notifications?.length || 0,
            },
            {
              title: "Обратная связь",
              href: AuthRoutes.FEEDBACK,
              icon: MessageCircle,
            },
          ],
        },
      ]}
    >
      {children}
    </BaseLayout>
  );
};
