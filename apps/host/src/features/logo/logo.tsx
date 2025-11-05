import { PublicRoutes } from "@/shared/config/routes/routes.public";
import { cn } from "@/shared/lib/utils";
import Image, { ImageProps } from "next/image";
import Link from "next/link";

import { FC } from "react";

interface Props extends Omit<ImageProps, "src" | "alt"> {}

export const Logo: FC<Props> = (props) => {
  return (
    <Link href={PublicRoutes.HOME}>
      <Image
        src={"/logo.svg"}
        alt="logo"
        width={127}
        height={47}
        {...props}
        className={cn("block", props.className)}
      />
    </Link>
  );
};
