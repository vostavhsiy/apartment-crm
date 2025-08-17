import { Heading } from "@/shared/ui/heading";

export default function MailResetPasswordSuccessPage() {
  return (
    <div className="w-full max-w-2xl">
      <Heading asChild className="text-center">
        <h2>Письмо для сброса пароля было успешно отправлено на ваш email.</h2>
      </Heading>
      <p className="mt-5 text-center text-lg">
        Пожалуйста, проверьте свою почту и следуйте инструкциям для сброса
        пароля.
      </p>
    </div>
  );
}
