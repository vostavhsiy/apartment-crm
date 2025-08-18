"use client";

import { AuthRoutes } from "@/shared/config/routes/routes.auth";
import { Heading } from "@/shared/ui/heading";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useMemo } from "react";

export const ActivationFailureInfo = () => {
  const searchParams = useSearchParams();

  const message = useMemo(() => {
    return searchParams.get("message") || null;
  }, [searchParams]);

  if (message)
    return (
      <div className="w-full max-w-2xl">
        <Heading asChild className="text-center">
          <h2>{message}</h2>
        </Heading>
        ;
      </div>
    );

  return (
    <div className="w-full max-w-2xl">
      <Heading asChild className="text-center">
        <h2> Ошибка при активации аккаунта!</h2>
      </Heading>
      <p className="mt-5 text-center text-lg">
        Попробуйте еще раз в{" "}
        <Link className="font-semibold underline" href={AuthRoutes.DASHBOARD}>
          профиле
        </Link>
        .
      </p>
    </div>
  );
};
