"use client";

import { useCreateCollection } from "@/entities/collection/api/hooks";
import { AuthRoutes } from "@/shared/config/routes/routes.auth";
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
import { Textarea } from "@/shared/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(2, "Название должно содержать не менее 2 символов"),
  description: z.string(),
});

export const AddCollectionForm = () => {
  const { mutate: addCollection, isPending: isAddPending } =
    useCreateCollection();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    addCollection(
      {
        title: values.title,
        description: values.description,
      },
      {
        onSuccess(response) {
          if (response) {
            form.reset();
            toast.success("Подборка успешно добавлена!");
            router.push(AuthRoutes.COLLECTIONS);
          } else {
            toast.error("Ошибка при добавлении подборки! Попробуйте еще раз!");
          }
        },
        onError() {
          toast.error("Ошибка при добавлении подборки! Попробуйте еще раз!");
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("max-w-2xl w-full mx-auto space-y-8")}
      >
        <h1 className="text-2xl font-bold text-center">Добавить подборку</h1>
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
          disabled={isAddPending}
          type="submit"
        >
          Добавить подборку
        </Button>
      </form>
    </Form>
  );
};
