"use client";

import { Heading } from "@/shared/ui/heading";
import { useSearchParams } from "next/navigation";

import { useMemo } from "react";

export const ActivationFailureInfo = () => {
  const searchParams = useSearchParams();

  const message = useMemo(() => {
    return (
      searchParams.get("message") || (
        <p>
          Ошибка при активации аккаунта. <br /> Попробуйте еще раз в профиле!
        </p>
      )
    );
  }, [searchParams]);

  return (
    <Heading asChild className="text-center">
      <h2>{message}</h2>
    </Heading>
  );
};
