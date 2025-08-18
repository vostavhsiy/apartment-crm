"use client";

import { useResetPassword } from "@/entities/user/api/hooks";
import { PublicRoutes } from "@/shared/config/routes/routes.public";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Heading } from "@/shared/ui/heading";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useMemo } from "react";

const formSchema = z
  .object({
    password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Пароли не совпадают",
    path: ["repeatPassword"],
  });

export const ResetPasswordForm = () => {
  const { mutate: sendResetPassword, isPending } = useResetPassword();

  const router = useRouter();
  const searchParams = useSearchParams();

  const token = useMemo(
    () => searchParams.get("token") || null,
    [searchParams],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      repeatPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isPending) return;
    if (!token) {
      toast.error(
        "Ошибка при восстановлении пароля. Проверьте ссылку из письма или попробуйте еще раз!",
      );
      return;
    }
    sendResetPassword(
      { password: values.password, token },
      {
        onSuccess: () => {
          router.push(PublicRoutes.SIGN_IN);
          toast.success("Пароль успешно восстановлен!");
        },
        onError: () => {
          toast.error("Ошибка при восстановлении пароля. Попробуйте еще раз!");
        },
      },
    );
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="block space-y-8 w-full"
      >
        <Heading className="text-center">Восстановление пароля</Heading>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Новый пароль*</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Введите новый пароль"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repeatPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Потверждение пароля*</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Повторите пароль"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} className="w-full" type="submit">
          Восстановить
        </Button>
      </form>
    </Form>
  );
};
