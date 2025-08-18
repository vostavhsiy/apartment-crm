import { PublicRoutes } from "@/shared/config/routes/routes.public";
import { Button } from "@/shared/ui/button";
import { Heading } from "@/shared/ui/heading";
import Link from "next/link";

export default function ActivationSuccessPage() {
  return (
    <div className="w-full flex flex-col items-center gap-5 max-w-2xl">
      <Heading asChild className="text-center">
        <h2>Аккаунт успешно активирован.</h2>
      </Heading>

      <Button variant={"outline"} size={"lg"} asChild>
        <Link href={PublicRoutes.HOME}>На главную</Link>
      </Button>
    </div>
  );
}
