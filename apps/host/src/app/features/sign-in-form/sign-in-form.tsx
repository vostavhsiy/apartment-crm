"use client";

import { useSignIn } from "@/entities/user/api/hooks";
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
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useMemo } from "react";

const formSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
});

export const SignInForm = () => {
  const { mutate: signIn, isPending } = useSignIn();
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = useMemo(() => searchParams.get("from") || null, [searchParams]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isPending) return;
    signIn(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          router.push(from || PublicRoutes.HOME);
          toast.success("Вы успешно вошли в систему!");
          form.reset();
        },
        onError: (error) => {
          //@ts-ignore
          const message = error.response?.data?.message;
          toast.error(message || "Ошибка входа. Попробуйте еще раз!");
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
        <Heading className="text-center">Вход в систему</Heading>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email*</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль*</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Ваш пароль" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-center my-2 text-sm">
            Забыли пароль?{" "}
            <Link
              href={PublicRoutes.MAIL_RESET_PASSWORD}
              className="font-semibold hover:underline"
            >
              Восстановить
            </Link>
          </p>
        </div>

        <Button disabled={isPending} className="w-full" type="submit">
          Войти
        </Button>
        <p className="text-center">
          У вас нет аккаунта?{" "}
          <Link
            href={PublicRoutes.SIGN_UP}
            className="font-semibold hover:underline"
          >
            Зарегистрироваться
          </Link>
        </p>
      </form>
    </Form>
  );
};
