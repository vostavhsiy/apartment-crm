"use client";

import { ApartmentWithRelations } from "@/entities/apartment/model/apartment-with-relations";
import { ApartmentFilesDialog } from "@/features/apartment-files-dialog/apartment-files-dialog";

import { FC } from "react";

interface Props {
  apartment: ApartmentWithRelations;
}

export const ApartmentImages: FC<Props> = ({ apartment }) => {
  return (
    <div className="w-full mb-8">
      <ApartmentFilesDialog
        files={apartment.files}
        title={apartment.title}
        previewSlider
      />
    </div>
  );
};
