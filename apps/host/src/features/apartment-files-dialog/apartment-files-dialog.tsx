"use client";

import { cn } from "@/shared/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { File } from "@prisma/client";
import Image from "next/image";

import { FC } from "react";

interface Props {
  files: File[];
  title?: string;
  previewSlider?: boolean;
}

export const ApartmentFilesDialog: FC<Props> = ({
  files,
  title,
  previewSlider,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="">
        {!previewSlider && (
          <Image
            src={files?.[0].url}
            alt={`Image`}
            width={500}
            height={500}
            className="size-full object-cover object-center rounded-lg"
          />
        )}
      </DialogTrigger>
      <DialogContent className="!max-w-full w-screen h-screen rounded-none bg-black border-black text-white">
        {!title && <DialogTitle className="hidden"></DialogTitle>}
        {title && <DialogTitle>{title}</DialogTitle>}
        <Carousel
          className={cn("max-sm:flex max-sm:items-center", !title && "mt-10")}
        >
          <CarouselContent className="max-h-[85vh]">
            {files.map((file) => {
              return (
                <CarouselItem
                  key={file.id}
                  className="flex items-center justify-center select-none"
                >
                  <Image
                    src={file.url}
                    alt={`Image`}
                    width={500}
                    height={500}
                    className="object-contain h-full"
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="bg-white dark:hover:bg-gray-300 text-black dark:hover:text-black left-3" />
          <CarouselNext className="bg-white dark:hover:bg-gray-300 text-black dark:hover:text-black right-3" />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};
