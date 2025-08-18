"use client";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Menu, X } from "lucide-react";

import { Dispatch, FC, SetStateAction, useEffect } from "react";

interface Props {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

export const MenuBurger: FC<Props> = ({ open, setOpen, className }) => {
  const handleOpen = () => {
    setOpen?.((prev) => !prev);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <Button
      onClick={handleOpen}
      className={cn("min-md:hidden relative z-100", className)}
      size={"icon"}
    >
      {!open ? <Menu /> : <X />}
    </Button>
  );
};
