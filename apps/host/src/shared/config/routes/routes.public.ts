import { settings } from "@/shared/lib/env";

export class PublicRoutes {
  static SIGN_IN = "/auth/sign-in";
  static SIGN_UP = "/auth/sign-up";
  static RESET_PASSWORD = "/auth/reset-password";
  static MAIL_RESET_PASSWORD = "/auth/mail-reset-password";
  static MAIL_RESET_PASSWORD_SUCCESS = "/auth/mail-reset-password/success";

  static HOME = "/";

  static CLIENT_COLLECTION(id: string) {
    return settings.NEXT_PUBLIC_DOMAIN_URL + `/c/${id}`;
  }
}
