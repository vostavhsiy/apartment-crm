"use client";

import { useSendResetPasswordEmail } from "@/entities/user/api/hooks";
import { PublicRoutes } from "@/shared/config/routes/routes.public";
import {
  getPasswordMailExpireTimeDiff,
  setPasswordMailExpire,
} from "@/shared/lib/helpers/password";
import { cn, getMMSSfromSeconds } from "@/shared/lib/utils";
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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Некорректный email"),
});

export const MailResetPasswordForm = () => {
  const { mutate: sendResetPasswordEmail, isPending } =
    useSendResetPasswordEmail();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [diffTime, setDiffTime] = useState(0);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isPending) return;

    const time = getPasswordMailExpireTimeDiff();
    if (time) {
      if (diffTime) return;
      setDiffTime(time);
      let interval = setInterval(() => {
        setDiffTime((prev) => {
          if (prev - 1 === 0) clearInterval(interval);
          return prev - 1;
        });
      }, 1000);
      return;
    }

    sendResetPasswordEmail(values.email, {
      onSuccess: () => {
        router.push(PublicRoutes.MAIL_RESET_PASSWORD_SUCCESS);
        toast.success("Письмо для сброса пароля отправлено!");
        setPasswordMailExpire();
      },
      onError: (error) => {
        toast.error("Ошибка при отправке письма. Попробуйте позже!");
      },
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="block w-full">
        <Heading className="text-center mb-8">Восстановление пароля</Heading>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className={cn(diffTime === 0 && "mb-8")}>
              <FormLabel>Email*</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {diffTime > 0 && (
          <p className="text-center mt-4 mb-10">
            Вы можете попробовать еще раз через{" "}
            <span className="font-semibold">
              {getMMSSfromSeconds(diffTime)}
            </span>
          </p>
        )}
        <Button
          disabled={isPending || diffTime > 0}
          className="w-full"
          type="submit"
        >
          Восстановить
        </Button>
      </form>
    </Form>
  );
};
