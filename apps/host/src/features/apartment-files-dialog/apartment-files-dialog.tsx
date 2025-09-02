"use client";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/shared/ui/dialog";
import { File } from "@prisma/client";
import { X } from "lucide-react";
import Image from "next/image";

import { FC, useEffect, useState } from "react";

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
  const [previewApi, setPreviewApi] = useState<CarouselApi>();
  const [dialogApi, setDialogApi] = useState<CarouselApi>();
  const [previewCurrent, setPreviewCurrent] = useState(0);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!previewApi) {
      return;
    }
    setPreviewCurrent(previewApi.selectedScrollSnap());

    previewApi.on("select", () => {
      setPreviewCurrent(previewApi.selectedScrollSnap());
    });
  }, [previewApi]);

  useEffect(() => {
    if (!dialogApi) {
      return;
    }

    dialogApi.scrollTo(previewCurrent, true);
  }, [dialogApi]);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="size-full">
      {!previewSlider ? (
        <Image
          onClick={handleOpen}
          src={files?.[0].url}
          alt={`Image`}
          width={500}
          height={500}
          className="cursor-pointer size-full object-cover object-center rounded-lg"
        />
      ) : (
        <Carousel setApi={setPreviewApi} className="w-full h-full">
          <CarouselContent>
            {files.map((file, index) => (
              <CarouselItem
                onClick={handleOpen}
                className="rounded-lg"
                key={index}
              >
                <div className="cursor-pointer w-full h-60 sm:h-auto sm:aspect-video">
                  <Image
                    src={file.url}
                    alt={`Image ${index + 1}`}
                    width={500}
                    height={500}
                    className="object-cover w-full h-60 sm:h-auto sm:aspect-video rounded-lg bg-muted-foreground/50"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {files?.length > 0 && (
            <>
              <CarouselPrevious className="max-md:absolute max-lg:left-4 max-lg:top-1/2 max-lg:transform max-lg:-translate-y-1/2 z-10" />
              <CarouselNext className="max-lg:absolute max-lg:right-4 max-lg:top-1/2 max-lg:transform max-lg:-translate-y-1/2 z-10" />
            </>
          )}
        </Carousel>
      )}

      <Dialog
        open={open}
        onOpenChange={(open) => {
          if (open) {
            dialogApi?.scrollTo(previewCurrent);
          } else {
            previewApi?.scrollTo(previewCurrent, true);
          }
          setOpen(open);
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="max-xl:block !max-w-full w-screen h-screen rounded-none bg-black border-black text-white"
        >
          <DialogClose className="absolute top-4 right-4" asChild>
            <Button variant={"ghost"} type="button" size={"icon"}>
              <X className="size-6" />
            </Button>
          </DialogClose>
          {!title && <DialogTitle className="hidden"></DialogTitle>}
          {title && <DialogTitle>{title}</DialogTitle>}
          <Carousel
            setApi={setDialogApi}
            className={cn(
              "max-sm:flex h-full max-sm:items-center",
              !title && "mt-10",
            )}
          >
            <CarouselContent className="h-[85vh]">
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
    </div>
  );
};
