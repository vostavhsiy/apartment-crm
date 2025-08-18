import { cn } from "@/shared/lib/utils";

import { Dispatch, FC, ReactNode, SetStateAction, SyntheticEvent } from "react";

interface Props {
  children: ReactNode;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

export const MenuDrawer: FC<Props> = ({
  children,
  open,
  setOpen,
  className,
}) => {
  const handleClick = (event: SyntheticEvent<HTMLDivElement>) => {
    const target = event.target as Element;
    if (["a", "button"].includes(target.tagName.toLowerCase())) {
      setOpen?.(false);
    }
  };

  return (
    <div
      className={cn(
        "min-md:hidden transition-all duration-400 bg-primary fixed z-10 w-full h-screen overflow-y-auto top-0 left-full flex flex-col justify-center items-center gap-8",
        className,
        open && "left-0",
      )}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
