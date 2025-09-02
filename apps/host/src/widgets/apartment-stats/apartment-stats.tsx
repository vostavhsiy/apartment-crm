import { ApartmentWithRelations } from "@/entities/apartment/model/apartment-with-relations";
import { getShortNumber, wordEnding } from "@/shared/lib/utils";
import { Card, CardContent } from "@/shared/ui/card";
import { Bookmark, Eye, Heart } from "lucide-react";

import { FC } from "react";

interface Props {
  apartment: ApartmentWithRelations;
}

export const ApartmentStats: FC<Props> = ({ apartment }) => {
  return (
    <Card className="mb-10">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Bookmark className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-foreground">
              {getShortNumber(apartment.collectionsLinks.length)}
            </div>
            <div className="text-sm text-muted-foreground">
              {apartment.collectionsLinks.length}{" "}
              {wordEnding(apartment.collectionsLinks.length, [
                "подборка",
                "подборки",
                "подборок",
              ])}
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Eye className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-foreground">
              {getShortNumber(apartment.clientViews.length)}
            </div>
            <div className="text-sm text-muted-foreground">
              {apartment.clientViews.length}{" "}
              {wordEnding(apartment.clientViews.length, [
                "просмотр",
                "просмотра",
                "просмотров",
              ])}
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Heart className="h-5 w-5 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-foreground">
              {getShortNumber(apartment.clientsLikes.length)}
            </div>
            <div className="text-sm text-muted-foreground">
              нравится {apartment.clientsLikes.length}{" "}
              {wordEnding(apartment.clientsLikes.length, [
                "клиенту",
                "клиентам",
                "клиентам",
              ])}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
