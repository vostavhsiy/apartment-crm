"use client";

import { useCreateClient } from "@/entities/client/api/hooks";
import { AuthRoutes } from "@/shared/config/routes/routes.auth";
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
import { S3BucketFolders } from "@apartment-crm/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Имя должно содержать не менее 2 символов"),
  phone: z.string(),
});

export const AddClientForm = () => {
  const { mutate: uploadFile, isPending: isUploadPending } = useUploadFile();
  const { mutate: addClient, isPending: isAddPending } = useCreateClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const router = useRouter();

  const [image, setImage] = useState<File | null>(null);

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
  };

  function handleAddClient(name: string, phone: string, avatarUrl?: string) {
    addClient(
      {
        name,
        phone,
        avatarUrl,
      },
      {
        onSuccess(response) {
          if (response) {
            form.reset();
            setImage(null);
            toast.success("Клиент успешно добавлен!");
            router.push(AuthRoutes.COLLECTIONS);
          } else {
            toast.error("Ошибка при добавлении клиента! Попробуйте еще раз!");
          }
        },
        onError(error) {
          //@ts-ignore
          const message = error.response?.data?.message;
          toast.error(
            message || "Ошибка при добавлении клиента! Попробуйте еще раз!",
          );
        },
      },
    );
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (image) {
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
              handleAddClient(values.name, values.phone, data?.url);
            } else {
              toast.error(
                "Не удалось загрузить фотографию клиенту. Попробуйте еще раз!",
              );
            }
          },
        },
      );
    } else {
      handleAddClient(values.name, values.phone);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("max-w-2xl w-full mx-auto space-y-8")}
      >
        <h1 className="text-2xl font-bold text-center">Добавить клиента</h1>
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
                src={URL.createObjectURL(image)}
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
              Добавить фотографию
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
          disabled={isAddPending || isUploadPending}
          type="submit"
        >
          Добавить клиента
        </Button>
      </form>
    </Form>
  );
};
