"use client";

import { useSendResetPasswordEmail } from "@/entities/user/api/hooks";
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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isPending) return;
    sendResetPasswordEmail(values.email, {
      onSuccess: () => {
        router.push(PublicRoutes.MAIL_RESET_PASSWORD_SUCCESS);
        toast.success("Письмо для сброса пароля отправлено!");
      },
      onError: (error) => {
        toast.error("Ошибка при отправке письма. Попробуйте позже!");
      },
    });
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
        <Button disabled={isPending} className="w-full" type="submit">
          Восстановить
        </Button>
      </form>
    </Form>
  );
};
