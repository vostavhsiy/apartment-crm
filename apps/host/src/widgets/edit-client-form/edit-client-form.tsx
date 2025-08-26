"use client";

import { useFindClient, useUpdateClient } from "@/entities/client/api/hooks";
import { useUploadFile } from "@/shared/lib/api/s3/hooks";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Spinner } from "@/shared/ui/spinner";
import { S3BucketFolders } from "@apartment-crm/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { FC, useEffect, useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Имя должно содержать не менее 2 символов"),
  phone: z.string(),
});

interface Props {
  clientId: string;
}

export const EditClientForm: FC<Props> = ({ clientId }) => {
  const { mutate: uploadFile, isPending: isUploadPending } = useUploadFile();
  const { mutate: updateClient, isPending: isUpdatePending } =
    useUpdateClient();

  const { data: client, isPending: isClientPending } = useFindClient(clientId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const router = useRouter();

  const [image, setImage] = useState<File | string | null>(null);

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
  };

  function handleUpdateClient(name: string, phone: string, avatarUrl?: string) {
    updateClient(
      {
        id: clientId,
        dto: {
          name,
          phone,
          avatarUrl,
        },
      },
      {
        onSuccess(response) {
          if (response) {
            form.reset();
            setImage(null);
            toast.success("Клиент успешно обновлен!");
            router.refresh();
          } else {
            toast.error("Ошибка при обновлении клиента! Попробуйте еще раз!");
          }
        },
        onError(error) {
          //@ts-ignore
          const message = error.response?.data?.message;
          toast.error(
            message || "Ошибка при обновлении клиента! Попробуйте еще раз!",
          );
        },
      },
    );
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (image && typeof image !== "string") {
      uploadFile(
        { file: image, folder: S3BucketFolders.CLIENT_AVATARS },
        {
          onError() {
            toast.error(
              "Не удалось загрузить фотографию клиенту. Попробуйте еще раз!",
            );
          },
          onSuccess: (data) => {
            if (data) {
              handleUpdateClient(values.name, values.phone, data?.url);
            } else {
              toast.error(
                "Не удалось загрузить фотографию клиенту. Попробуйте еще раз!",
              );
            }
          },
        },
      );
    } else {
      handleUpdateClient(values.name, values.phone, image || "");
    }
  }

  useEffect(() => {
    if (client) {
      form.reset({ name: client.name, phone: client.phone });
      setImage(client.avatarUrl);
    }
    if (!isClientPending && !client) {
      notFound();
    }
  }, [client]);

  if (isClientPending) {
    return <Spinner />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("max-w-2xl w-full mx-auto space-y-8")}
      >
        <h1 className="text-2xl font-bold text-center">
          Редактировать клиента
        </h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя клиента</FormLabel>
              <FormControl>
                <Input placeholder="Имя" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Телефон клиента</FormLabel>
              <FormControl>
                <Input placeholder="Телефон" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <Label htmlFor="client-avatar">Фотография клиента</Label>
          <div className="relative group size-32 bg-secondary rounded-md overflow-hidden">
            {image && (
              <Image
                width={200}
                height={200}
                src={
                  typeof image === "string" ? image : URL.createObjectURL(image)
                }
                alt={`Uploaded image`}
                className="size-full object-cover object-center rounded"
              />
            )}
            {image && (
              <div
                className="cursor-pointer absolute transition-all inset-0 bg-black/80 opacity-0 invisible group-hover:opacity-100 group-hover:visible flex items-center justify-center text-white"
                onClick={() => setImage(null)}
              >
                <X size={30} />
              </div>
            )}
          </div>
          <Button asChild variant={"secondary"}>
            <label>
              Изменить фотографию
              <input
                id="client-avatar"
                type="file"
                accept="image/*"
                hidden
                onChange={addImage}
              />
            </label>
          </Button>
        </div>

        <Button
          className="w-full"
          size={"lg"}
          disabled={isUpdatePending || isUploadPending}
          type="submit"
        >
          Обновить клиента
        </Button>
      </form>
    </Form>
  );
};
