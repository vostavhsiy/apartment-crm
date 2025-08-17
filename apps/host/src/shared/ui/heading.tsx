import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import * as React from "react";

import { cn } from "../lib/utils";

const headingVariants = cva("font-semibold", {
  variants: {
    variant: {
      default: "",
    },
    size: {
      h1: "text-3xl",
      h2: "text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "h1",
  },
});

export const Heading = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p"> &
  VariantProps<typeof headingVariants> & {
    asChild?: boolean;
  }) => {
  const Comp = asChild ? Slot : "h1";

  return (
    <Comp
      data-slot="heading"
      className={cn(headingVariants({ variant, size, className }))}
      {...props}
    />
  );
};
