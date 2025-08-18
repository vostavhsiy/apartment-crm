"use client";

import { useSignUp } from "@/entities/user/api/hooks";
import { PublicRoutes } from "@/shared/config/routes/routes.public";
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
import { Heading } from "@/shared/ui/heading";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    email: z.string().email("Некорректный email"),
    name: z.string(),
    phone: z.string(),
    password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Пароли не совпадают",
    path: ["repeatPassword"],
  });

export const SignUpForm = () => {
  const { mutate: signUp, isPending } = useSignUp();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      repeatPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isPending) return;
    signUp(
      {
        email: values.email,
        password: values.password,
        name: values.name,
        phone: values.phone,
      },
      {
        onSuccess: () => {
          router.push(PublicRoutes.SIGN_IN);
          toast.success("Вы успешно зарегистрированы!");
        },
        onError: (error) => {
          //@ts-ignore
          const message = error.response?.data?.message;
          toast.error(message || "Ошибка регистрации. Попробуйте еще раз!");
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
        <Heading className="text-center">Регистрация</Heading>
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input placeholder="Ваше имя" {...field} />
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
        <FormField
          control={form.control}
          name="repeatPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Потверждение пароля*</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Ваш пароль" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} className="w-full" type="submit">
          Зарегистрироваться
        </Button>
        <p className="text-center">
          У вас уже есть аккаунт?{" "}
          <Link
            href={PublicRoutes.SIGN_IN}
            className="font-semibold hover:underline"
          >
            Войти
          </Link>
        </p>
      </form>
    </Form>
  );
};
