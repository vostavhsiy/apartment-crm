export class AuthRoutes {
  static DASHBOARD = "/dashboard";
  static PROFILE_SETTINGS = this.DASHBOARD + "/profile";
  static FEEDBACK = this.DASHBOARD + "/feedback";

  static COLLECTIONS = this.DASHBOARD + "/collections";
  static CREATE_COLLECTION = this.COLLECTIONS + "/add";
  static DASHBOARD_COLLECTION(id: string) {
    return this.COLLECTIONS + `/${id}`;
  }
  static DASHBOARD_COLLECTION_EDIT(id: string) {
    return this.COLLECTIONS + `/${id}/edit`;
  }
  static APARTMENTS = this.DASHBOARD + "/apartments";
  static CREATE_APARTMENT = this.APARTMENTS + "/add";
  static DASHBOARD_APARTMENT(id: string) {
    return this.APARTMENTS + `/${id}`;
  }
  static DASHBOARD_APARTMENT_EDIT(id: string) {
    return this.APARTMENTS + `/${id}/edit`;
  }
  static CLIENTS = this.DASHBOARD + "/clients";
  static CREATE_CLIENT = this.CLIENTS + "/add";
  static DASHBOARD_CLIENT(id: string) {
    return this.CLIENTS + `/${id}`;
  }
  static DASHBOARD_CLIENT_EDIT(id: string) {
    return this.CLIENTS + `/${id}/edit`;
  }
  static NOTIFICATIONS = this.DASHBOARD + "/notifications";
}
