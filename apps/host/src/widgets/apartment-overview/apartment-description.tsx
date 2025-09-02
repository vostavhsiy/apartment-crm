"use client";

import { ApartmentWithRelations } from "@/entities/apartment/model/apartment-with-relations";
import { TIPTAP_EMPTY_DOC } from "@/shared/lib/utils";
import { TipTap } from "@/shared/ui/tiptap-templates/simple/tiptap-content";

import { FC } from "react";

interface Props {
  apartment: ApartmentWithRelations;
}

export const ApartmentDescription: FC<Props> = ({ apartment }) => {
  return (
    <div>
      <p className="text-xl font-semibold mb-5">Описание</p>
      {apartment.description && apartment.description !== TIPTAP_EMPTY_DOC && (
        <TipTap value={apartment.description} />
      )}
    </div>
  );
};
