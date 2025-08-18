export class AuthRoutes {
  static DASHBOARD = "/dashboard";
  static PROFILE_SETTINGS = this.DASHBOARD + "/profile";
  static FEEDBACK = this.DASHBOARD + "/feedback";

  static COLLECTIONS = this.DASHBOARD + "/collections";
  static APARTMENTS = this.DASHBOARD + "/apartments";
  static CLIENTS = this.DASHBOARD + "/clients";
  static NOTIFICATIONS = this.DASHBOARD + "/notifications";

  static CREATE_COLLECTION = this.COLLECTIONS + "/create";
}
