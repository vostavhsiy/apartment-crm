export class AuthRoutes {
  static DASHBOARD = "/dashboard";
  static PROFILE_SETTINGS = this.DASHBOARD + "/profile";
  static FEEDBACK = this.DASHBOARD + "/feedback";

  static COLLECTIONS = this.DASHBOARD + "/collections";
  static APARTMENTS = this.DASHBOARD + "/apartments";
  static DASHBOARD_APARTMENT(id: string) {
    return this.APARTMENTS + `/${id}`;
  }
  static DASHBOARD_APARTMENT_EDIT(id: string) {
    return this.APARTMENTS + `/${id}/edit`;
  }
  static CLIENTS = this.DASHBOARD + "/clients";
  static NOTIFICATIONS = this.DASHBOARD + "/notifications";

  static CREATE_COLLECTION = this.COLLECTIONS + "/add";
}
