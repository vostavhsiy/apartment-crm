import { FindClientStatsResponse } from "@/entities/client/api/api";
import { getShortNumber } from "@/shared/lib/utils";
import { Card, CardContent } from "@/shared/ui/card";
import { Bookmark, Eye, Heart } from "lucide-react";

import { FC } from "react";

interface Props {
  clientStats: FindClientStatsResponse;
}

export const ClientStats: FC<Props> = ({ clientStats }) => {
  return (
    <Card className="mb-10">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {getShortNumber(clientStats.totalObjectsCount)}
            </div>
            <div className="text-sm text-muted-foreground">Всего объектов</div>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-3 justify-center">
              <Bookmark className="h-5 w-5 text-blue-600" />
              <div className="text-2xl font-bold text-foreground">
                {getShortNumber(clientStats.unseenApartementsCount)}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Непросмотренные объекты
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-3 justify-center">
              <Eye className="h-5 w-5 text-green-600" />
              <div className="text-2xl font-bold text-foreground">
                {getShortNumber(clientStats.totalViewsCount)}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Всего просмотров
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-3 justify-center">
              <Heart className="h-5 w-5 text-red-600" />
              <div className="text-2xl font-bold text-foreground">
                {getShortNumber(clientStats.totalLikesCount)}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Понравилось</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
