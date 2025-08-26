"use client";

import { useProfile, useUpdateUser } from "@/entities/user/api/hooks";
import { useUploadFile } from "@/shared/lib/api/s3/hooks";
import { cn, getInitials } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useEffect, useState } from "react";

const formSchema = z.object({
  name: z.string(),
  phone: z.string(),
});

export const EditProfileForm = () => {
  const { mutate: uploadFile, isPending: isUploadPending } = useUploadFile();
  const { mutate: updateProfile, isPending: isUpdatePending } = useUpdateUser();

  const { data: profile, isPending: isProfilePending } = useProfile();

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
    if (!profile?.id || isUpdatePending) return;
    updateProfile(
      {
        id: profile?.id,
        data: {
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
            toast.success("Профиль успешно обновлен!");
            router.refresh();
          } else {
            toast.error("Ошибка при обновлении профиля! Попробуйте еще раз!");
          }
        },
        onError(error) {
          //@ts-ignore
          const message = error.response?.data?.message;
          toast.error(
            message || "Ошибка при обновлении профиля! Попробуйте еще раз!",
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
              "Не удалось загрузить фотографию профиля. Попробуйте еще раз!",
            );
          },
          onSuccess: (data) => {
            if (data) {
              handleUpdateClient(values.name, values.phone, data?.url);
            } else {
              toast.error(
                "Не удалось загрузить фотографию профиля. Попробуйте еще раз!",
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
    if (profile) {
      form.reset({ name: profile.name || "", phone: profile.phone || "" });
      setImage(profile.avatarUrl);
    }
  }, [profile]);

  if (isProfilePending) {
    return <Spinner />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("max-w-2xl w-full mx-auto space-y-8")}
      >
        <h1 className="text-2xl font-bold text-center">
          Редактировать профиль
        </h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input placeholder="Ваше имя" type="text" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Имя будет отображаться в подборках, отправленных вашим клиентам.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Номер телефона</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Ваш номер телефона"
                  pattern="^(\+7|8)?[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Номер будет отображаться рядом с именем в подборках,
                отправленных вашим клиентам.
              </FormDescription>
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <Label htmlFor="client-avatar">Фотография профиля</Label>
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
            {!image && profile && (
              <div className="size-full flex items-center justify-center font-semibold text-5xl">
                {getInitials(profile.name || profile.email)}
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
          Обновить профиль
        </Button>
      </form>
    </Form>
  );
};
