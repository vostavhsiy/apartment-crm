import { PublicRoutes } from "@/shared/config/routes/routes.public";
import { Button } from "@/shared/ui/button";
import Link from "next/link";

export const SignInButton = () => {
  return (
    <Button asChild>
      <Link href={PublicRoutes.SIGN_IN}>Войти</Link>
    </Button>
  );
};
