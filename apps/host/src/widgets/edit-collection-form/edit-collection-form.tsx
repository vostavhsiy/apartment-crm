"use client";

import {
  useDeleteCollection,
  useFindCollection,
  useUpdateCollection,
} from "@/entities/collection/api/hooks";
import { AuthRoutes } from "@/shared/config/routes/routes.auth";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Spinner } from "@/shared/ui/spinner";
import { Textarea } from "@/shared/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { FC, useEffect, useState } from "react";

const formSchema = z.object({
  title: z.string().min(2, "Название должно содержать не менее 2 символов"),
  description: z.string(),
});

interface Props {
  collectionId: string;
}

export const EditCollectionForm: FC<Props> = ({ collectionId }) => {
  const { mutate: updateCollection, isPending: isUpdatePending } =
    useUpdateCollection();
  const { mutate: deleteCollection, isPending: isDeletePending } =
    useDeleteCollection();

  const [deleteOpen, setDeleteOpen] = useState(false);

  const { data: collection, isPending: isCollectionPending } =
    useFindCollection(collectionId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!collection) return;
    updateCollection(
      {
        id: collection.id,
        dto: {
          title: values.title,
          description: values.description,
        },
      },
      {
        onSuccess(response) {
          if (response) {
            form.reset();
            toast.success("Подборка успешно обновлена!");
            router.refresh();
          } else {
            toast.error("Ошибка при обновлении подборки! Попробуйте еще раз!");
          }
        },
        onError(error) {
          //@ts-ignore
          const message = error.response?.data?.message;
          toast.error(
            message || "Ошибка при добавлении подборки! Попробуйте еще раз!",
          );
        },
      },
    );
  }

  function handleDelete() {
    if (isDeletePending || !collection) return;
    deleteCollection(collection.id, {
      onSuccess() {
        router.push(AuthRoutes.COLLECTIONS);
        toast.success("Подборка успешно удалена!");
      },
      onError() {
        toast.error("Ошибка при удалении подборки");
      },
    });
  }

  useEffect(() => {
    if (collection) {
      form.reset({
        title: collection.title,
        description: collection.description || undefined,
      });
    }
  }, [collection]);

  if (isCollectionPending) {
    return <Spinner />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("max-w-2xl w-full mx-auto space-y-8")}
      >
        <h1 className="text-2xl font-bold text-center">
          Редактировать подборку
        </h1>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Заголовок</FormLabel>
              <FormControl>
                <Input placeholder="Заголовок" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Описание"
                  className="h-28 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-full"
          size={"lg"}
          disabled={isUpdatePending}
          type="submit"
        >
          Обновить подборку
        </Button>
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogTrigger asChild>
            <Button
              type="button"
              className="w-full"
              disabled={isDeletePending}
              variant={"destructive"}
            >
              Удалить подборку
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Вы точно хотите удалить подборку?</DialogTitle>
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
              >
                Удалить
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
};
