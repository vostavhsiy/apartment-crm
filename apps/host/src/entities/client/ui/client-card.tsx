import { CopyButton } from "@/features/copy-button/copy-button";
import { AuthRoutes } from "@/shared/config/routes/routes.auth";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardTitle } from "@/shared/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Skeleton } from "@/shared/ui/skeleton";
import { Ban, Edit, Eye, Heart, Home, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { FC, useState } from "react";

import { useDeleteClient } from "../api/hooks";
import { ClientWithRelations } from "../model/client-with-relations";

interface Props {
  client: ClientWithRelations;
}

export const ClientCard: FC<Props> = ({ client }) => {
  const { mutate: deleteClient, isPending: isDeletePending } =
    useDeleteClient();

  const [deleteOpen, setDeleteOpen] = useState(false);

  function handleDelete() {
    if (isDeletePending || !client) return;
    deleteClient(client.id, {
      onSuccess() {
        toast.success("Клиент успешно удален!");
      },
      onError() {
        toast.error("Ошибка при удалении клиента");
      },
    });
  }

  return (
    <Card className="w-full mx-auto">
      <CardContent className="flex max-sm:flex-col max-sm:gap-3 items-center">
        <div className="max-w-72 flex max-sm:flex-col max-sm:gap-3 items-center">
          <div
            className={cn(
              "relative size-20 flex items-center justify-center rounded-lg overflow-hidden shrink-0",
            )}
          >
            {client.avatarUrl ? (
              <Image
                src={client.avatarUrl}
                alt={client.name}
                width={500}
                height={500}
                className="size-full object-cover object-center rounded-lg"
              />
            ) : (
              <div className="size-full flex items-center text-center justify-center text-muted-foreground bg-muted-foreground/10">
                <Ban />
              </div>
            )}
          </div>
          <div className="px-4">
            <CardTitle>
              <Link
                className="line-clamp-2 leading-normal truncate text-lg text-blue-500 max-w-40"
                href={AuthRoutes.DASHBOARD_APARTMENT(client.id)}
              >
                {client.name}
              </Link>
            </CardTitle>
            {client.phone && (
              <div className="mt-2 flex items-center gap-3">
                <Badge
                  variant="secondary"
                  className="whitespace-normal line-clamp-2"
                >
                  {client.phone}
                </Badge>
                <CopyButton copyText={client.phone} />
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-full min-sm:ml-5">
          <p className="text-sm text-primary/70 mb-3 max-sm:text-center">
            Объекты
          </p>
          <div className="flex flex-wrap items-center max-sm:justify-center gap-3">
            <Badge
              variant={"secondary"}
              className="text-base flex items-center gap-3"
            >
              <Home className="!size-5" /> Отправлено{" "}
              {client.collectionsLinks.reduce(
                (acc, link) => acc + link.collection.apartmentsLinks.length,
                0,
              )}
            </Badge>
            <Badge
              variant={"secondary"}
              className="text-base flex items-center gap-3 text-green-600 bg-green-100"
            >
              <Eye className="!size-5" /> Просмотров{" "}
              {client.apartmentViews.length}
            </Badge>
            <Badge className="text-base flex items-center gap-3 text-red-600 bg-red-100">
              <Heart fill="red" className="!size-5" /> Понравилось{" "}
              {client.likes.length}
            </Badge>
          </div>
        </div>
        <div
          className={cn(
            "shrink-0 flex flex-col lg:flex-row items-center justify-between gap-2 mt-4 px-4",
          )}
        >
          <div className="w-full lg:w-max flex flex-col lg:flex-row items-center gap-2">
            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  size={"icon"}
                  disabled={isDeletePending}
                  variant={"destructive"}
                >
                  <Trash />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Вы точно хотите удалить клиента?</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant={"outline"}>
                      Отмена
                    </Button>
                  </DialogClose>
                  <Button
                    disabled={isDeletePending}
                    variant={"destructive"}
                    onClick={handleDelete}
                    type="button"
                  >
                    Удалить
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button asChild variant={"outline"}>
              <Link href={AuthRoutes.DASHBOARD_CLIENT_EDIT(client.id)}>
                <Edit /> Редактировать
              </Link>
            </Button>
            <Button
              asChild
              variant={"secondary"}
              className="cursor-pointer w-full lg:w-max"
            >
              <Link href={AuthRoutes.DASHBOARD_APARTMENT(client.id)}>
                Подробнее
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const ClientCardSkeleton = () => {
  return <Skeleton className="rounded-xl h-46 max-sm:h-[28rem]" />;
};
