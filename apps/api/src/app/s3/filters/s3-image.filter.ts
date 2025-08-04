import { BadRequestException } from "@nestjs/common";
import { Request } from "express";

export const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(
      new BadRequestException(
        "Разрешены только изображения: jpeg, png, webp, gif",
      ),
      false,
    );
  }
};
