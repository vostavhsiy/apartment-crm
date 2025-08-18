import { cn } from "@/shared/lib/utils";
import Image, { ImageProps } from "next/image";

import { FC } from "react";

interface Props extends Omit<ImageProps, "src" | "alt"> {}

export const Logo: FC<Props> = (props) => {
  return (
    <Image
      src={"/logo.png"}
      alt="logo"
      width={200}
      height={200}
      {...props}
      className={cn("block w-full h-full rounded-sm", props.className)}
    />
  );
};
