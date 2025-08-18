"use client";

import { useSignOut } from "@/entities/user/api/hooks";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useState } from "react";

export const SignOutButton = () => {
  const router = useRouter();

  const { mutate: signOut, isPending } = useSignOut();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (isPending) return;
    signOut(undefined, {
      onSuccess(data) {
        if (data.ok) {
          toast.success("Вы успешно вышли из аккаунта!");
          router.refresh();
        } else {
          toast.error("Ошибка при выходе из аккаунта!");
        }
        setOpen(false);
      },
      onError() {
        toast.error("Ошибка при выходе из аккаунта!");
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger asChild>
        <Button className="w-full" disabled={isPending} variant={"destructive"}>
          Выйти из аккаунта
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Вы точно хотите выйти из аккаунта?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Отмена</Button>
          </DialogClose>
          <Button
            disabled={isPending}
            variant={"destructive"}
            onClick={handleClick}
          >
            Выйти
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
