"use client";

import { useProfile, useSendActivationMail } from "@/entities/user/api/hooks";
import {
  getMailExpireTimeDiff,
  setMailExpire,
} from "@/shared/lib/helpers/password";
import { cn, getMMSSfromSeconds } from "@/shared/lib/utils";
import { Button, ButtonProps } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { Ban } from "lucide-react";
import { toast } from "sonner";

import { FC, useState } from "react";

interface Props extends ButtonProps {}

export const ActivationButton: FC<Props> = (props) => {
  const { data: profile, isPending: isProfilePending } = useProfile();
  const { mutate: sendActivationMail, isPending } = useSendActivationMail();

  const [diffTime, setDiffTime] = useState(0);

  const handleClick = () => {
    if (!profile) return;

    const time = getMailExpireTimeDiff(true);
    if (time) {
      if (diffTime) return;
      setDiffTime(time);
      let interval = setInterval(() => {
        setDiffTime((prev) => {
          if (prev - 1 === 0) clearInterval(interval);
          return prev - 1;
        });
      }, 1000);
      return;
    }

    sendActivationMail(undefined, {
      onSuccess() {
        toast.success(`Письмо отправлено на почту ${profile.email}!`);
        setMailExpire(true);
      },
      onError() {
        toast.error("Ошибка при отправке письма. Попробуйте еше раз!");
      },
    });
  };

  if (isProfilePending) {
    return <Skeleton className="w-[11.25rem] h-9" />;
  }

  if ((!isProfilePending && !profile) || profile.isActive) return null;

  return (
    <Button
      disabled={isPending || diffTime > 0}
      onClick={handleClick}
      {...props}
      className={cn("w-[11.25rem]", props.className)}
    >
      {diffTime > 0 ? (
        <>
          <Ban />
          <span className="font-semibold">{getMMSSfromSeconds(diffTime)}</span>
        </>
      ) : (
        "Активировать аккаунт"
      )}
    </Button>
  );
};
