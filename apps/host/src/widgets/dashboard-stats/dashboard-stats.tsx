"use client";

import { useFindApartmentsForUserPerPage } from "@/entities/apartment/api/hooks";
import { useFindClientsForUserPerPage } from "@/entities/client/api/hooks";
import { useFindCollectionsForUserPerPage } from "@/entities/collection/api/hooks";
import { useGetUserStats } from "@/entities/user/api/hooks";
import { AuthRoutes } from "@/shared/config/routes/routes.auth";
import { getShortNumber, wordEnding } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Spinner } from "@/shared/ui/spinner";
import { SortOrder } from "@apartment-crm/types";
import { Building2, Eye, FolderOpen, Heart, MapPin, Users } from "lucide-react";
import Link from "next/link";

export const DashboardStats = () => {
  const { data: stats, isPending: isStatsPending } = useGetUserStats();
  const { data: apartmentsData, isPending: isApartmentsPending } =
    useFindApartmentsForUserPerPage({ sortOrder: SortOrder.UPDATED_AT });
  const { data: collectionsData, isPending: isCollectionsPending } =
    useFindCollectionsForUserPerPage({ sortOrder: SortOrder.UPDATED_AT });
  const { data: clientsData, isPending: isClientsPending } =
    useFindClientsForUserPerPage({ sortOrder: SortOrder.UPDATED_AT });

  const pending =
    isStatsPending ||
    isApartmentsPending ||
    isCollectionsPending ||
    isClientsPending;

  const totalApartments = apartmentsData?.count || 0;
  const totalCollections = collectionsData?.count || 0;
  const totalClients = clientsData?.count || 0;

  const recentApartments = apartmentsData?.data.slice(0, 3) || [];
  const recentCollections = collectionsData?.data.slice(0, 3) || [];

  if (pending) return <Spinner />;

  return (
    <div className="w-full p-6 max-sm:px-0">
      <div className="max-w-7xl mx-auto space-y-8 w-full">
        <div className="flex items-center justify-between gap-5 max-sm:flex-col max-sm:text-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Панель управления
            </h1>
            <p className="text-muted-foreground mt-2">
              Сервис для работы с покупателями недвижимости
            </p>
          </div>
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Link href={AuthRoutes.CREATE_APARTMENT}>
              <Building2 className="w-4 h-4 mr-2" />
              Добавить объект
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                Объекты недвижимости
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground truncate">
                {totalApartments}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats?.publishedCount || 0} опубликовано
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                Подборки
              </CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground truncate">
                {totalCollections}
              </div>
              <p className="text-xs text-muted-foreground">Группы объектов</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                Клиенты
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground truncate">
                {totalClients}
              </div>
              <p className="text-xs text-muted-foreground">
                добавленные клиенты
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                Всего просмотров
              </CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground truncate">
                {stats?.totalViews || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Просмотры объектов
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                Всего понравившихся
              </CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground truncate">
                {stats?.totalLikes || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Избранное клиентов
              </p>
            </CardContent>
          </Card>

          {stats?.mostViewedApartment && (
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">
                  Самое просматриваемое
                </CardTitle>
                <Eye className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <Link
                  href={AuthRoutes.DASHBOARD_APARTMENT(
                    stats.mostViewedApartment.id,
                  )}
                  className="block text-lg font-bold text-card-foreground truncate"
                >
                  {stats.mostViewedApartment.title}
                </Link>
                <p className="text-xs text-muted-foreground">
                  {stats.mostViewedApartment?.clientViews?.length || 0}{" "}
                  {wordEnding(
                    stats.mostViewedApartment?.clientViews?.length || 0,
                    ["просмотр", "просмотра", "просмотров"],
                  )}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats?.mostViewedApartment && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary max-[425px]:hidden" />
                  Самый просматриваемый объект
                </CardTitle>
                <CardDescription className="max-[425px]:text-sm">
                  Объект с наибольшим количеством просмотров
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between max-sm: gap-3">
                    <div className="space-y-1 max-w-3/4">
                      <Link
                        href={AuthRoutes.DASHBOARD_APARTMENT(
                          stats.mostViewedApartment.id,
                        )}
                        className="block font-semibold text-card-foreground truncate"
                      >
                        {stats.mostViewedApartment?.title}
                      </Link>
                      <p className="text-sm text-muted-foreground truncate">
                        {stats.mostViewedApartment?.subtitle}
                      </p>
                      <div className="flex items-center gap-2 lg:gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate max-w-56 max-sm:max-w-28">
                            {stats.mostViewedApartment?.address}
                          </span>
                        </span>
                        <span className="truncate max-w-24">
                          {stats.mostViewedApartment?.price}
                        </span>
                      </div>
                    </div>
                    <div className="text-right space-y-1 shrink-0">
                      <div className="text-2xl font-bold text-primary">
                        {stats.mostViewedApartment.clientViews.length}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {" "}
                        {wordEnding(
                          stats.mostViewedApartment.clientViews.length,
                          ["просмотр", "просмотра", "просмотров"],
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          {stats?.mostLikedApartment && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary max-[425px]:hidden" />
                  Самый понравившийся объект
                </CardTitle>
                <CardDescription className="max-[425px]:text-sm">
                  Объект с наибольшим количеством лайков
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 max-w-3/4">
                      <Link
                        href={AuthRoutes.DASHBOARD_APARTMENT(
                          stats.mostLikedApartment.id,
                        )}
                        className="block font-semibold text-card-foreground truncate"
                      >
                        {stats.mostLikedApartment.title}
                      </Link>
                      <p className="text-sm text-muted-foreground truncate">
                        {stats.mostLikedApartment.subtitle}
                      </p>
                      <div className="flex items-center gap-2 lg:gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate max-w-56 max-sm:max-w-28">
                            {stats.mostLikedApartment.address}
                          </span>
                        </span>
                        <span className="truncate max-w-24">
                          {stats.mostLikedApartment.price}
                        </span>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-2xl font-bold text-primary">
                        {stats.mostLikedApartment.clientsLikes.length}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {wordEnding(
                          stats.mostLikedApartment.clientsLikes.length,
                          ["лайк", "лайка", "лайков"],
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">
                Свежие объекты
              </CardTitle>
              <CardDescription>Последние объявления объектов</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentApartments.length > 0 ? (
                recentApartments.map((apartment) => (
                  <div
                    key={apartment.id}
                    className="flex max-sm:flex-col items-center justify-between p-4 rounded-lg bg-muted/50 gap-2"
                  >
                    <div className="space-y-1 max-w-full sm:max-w-4/5">
                      <Link
                        href={AuthRoutes.DASHBOARD_APARTMENT(apartment.id)}
                        className="block font-medium text-card-foreground truncate"
                      >
                        {apartment.title}
                      </Link>
                      <span className="block text-sm text-muted-foreground truncate">
                        {apartment.subtitle}
                      </span>
                      <div className="flex max-sm:flex-col items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                        <span className="truncate max-w-66 max-sm:max-w-full">
                          {apartment.address}
                        </span>
                        <span className="truncate max-w-24">
                          {apartment.price}
                        </span>
                      </div>
                    </div>
                    <div className="text-right space-y-1 w-max">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Eye className="w-3 h-3" />
                        {getShortNumber(apartment.clientViews.length)}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Heart className="w-3 h-3" />
                        {getShortNumber(apartment.clientsLikes.length)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Нет недавних объектов.</p>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Подборки</CardTitle>
                <CardDescription>Группы объектов</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentCollections.length > 0 ? (
                  recentCollections.map((collection) => (
                    <div
                      key={collection.id}
                      className="flex max-sm:flex-col items-center justify-between p-3 rounded-lg bg-muted/50 gap-3"
                    >
                      <Link
                        href={AuthRoutes.DASHBOARD_COLLECTION(collection.id)}
                        className="flex items-center gap-3 max-w-full sm:max-w-4/5"
                      >
                        <FolderOpen className="w-4 h-4 text-primary shrink-0" />
                        <span className="font-medium text-card-foreground truncate">
                          {collection.title}
                        </span>
                      </Link>
                      <Badge variant="outline">
                        {collection.apartmentsLinks.length}{" "}
                        {wordEnding(collection.apartmentsLinks.length, [
                          "объект",
                          "объекта",
                          "объектов",
                        ])}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p>Нет недавних коллекций.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
