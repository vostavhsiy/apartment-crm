import cookie from "cookiejs";

export const getCookie = (name: string) => {
  return cookie.get(name);
};
