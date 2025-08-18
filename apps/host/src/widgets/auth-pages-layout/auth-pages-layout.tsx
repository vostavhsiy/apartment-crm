import { BaseLayout } from "@/features/base-layout/base-layout";
import { Logo } from "@/features/logo/logo";
import { ThemeButton } from "@/features/theme-button/theme-button";
import { PublicRoutes } from "@/shared/config/routes/routes.public";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import Link from "next/link";

import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const AuthPagesLayout: FC<Props> = ({ children }) => {
  return (
    <BaseLayout
      headerContentSlot={
        <>
          <div className="w-full h-full flex items-center gap-5 justify-between">
            <Link
              href={PublicRoutes.HOME}
              className="h-full flex gap-5 items-center "
            >
              <Logo className="h-full" />
              <Button className="max-md:hidden" variant={"secondary"}>
                Главная
              </Button>
            </Link>
            <div className="flex items-center gap-5">
              <Button className="max-md:hidden" asChild variant={"outline"}>
                <Link href={PublicRoutes.SIGN_IN}>Войти</Link>
              </Button>
              <Button className="max-md:hidden" asChild variant={"outline"}>
                <Link href={PublicRoutes.SIGN_UP}>Зарегистрироваться</Link>
              </Button>
              <Separator
                orientation="vertical"
                className="!h-10 max-md:hidden"
              />
              <ThemeButton />
            </div>
          </div>
        </>
      }
      headerMobileContentSlot={
        <>
          <Button asChild variant={"link"} className="text-background text-2xl">
            <Link href={PublicRoutes.HOME}>На главную</Link>
          </Button>
          <Button asChild variant={"link"} className="text-background text-2xl">
            <Link href={PublicRoutes.SIGN_IN}>Войти</Link>
          </Button>
          <Button asChild variant={"link"} className="text-background text-2xl">
            <Link href={PublicRoutes.SIGN_UP}>Зарегистрироваться</Link>
          </Button>
        </>
      }
    >
      {children}
    </BaseLayout>
  );
};
