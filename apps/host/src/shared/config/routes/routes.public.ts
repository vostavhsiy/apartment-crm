import { settings } from "@/shared/lib/env";

export class PublicRoutes {
  static SIGN_IN = "/auth/sign-in";
  static SIGN_UP = "/auth/sign-up";
  static RESET_PASSWORD = "/auth/reset-password";
  static MAIL_RESET_PASSWORD = "/auth/mail-reset-password";
  static MAIL_RESET_PASSWORD_SUCCESS = "/auth/mail-reset-password/success";

  static HOME = "/";

  static CLIENT_COLLECTION(id: string, relative?: boolean) {
    return (!relative ? settings.NEXT_PUBLIC_DOMAIN_URL : "") + `/c/${id}`;
  }

  static CLIENT_COLLECTION_MORTGAGE(id: string) {
    return this.CLIENT_COLLECTION(id, true) + `/mortgage`;
  }

  static CLIENT_COLLECTION_MAP(id: string) {
    return this.CLIENT_COLLECTION(id, true) + `/map`;
  }

  static CLIENT_APARTMENT(collectionClientId: string, id: string) {
    return this.CLIENT_COLLECTION(collectionClientId) + `/ap/${id}`;
  }
}
