import axios from "axios";

import { ROUTES } from "./api/routes";
import { settings } from "./env";

export const publicInstance = axios.create({
  baseURL: settings.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const authInstance = axios.create({
  baseURL: settings.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

authInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    try {
      const { status } = error.response;
      if (status == 401 && !error.response._retry) {
        error.response._retry = true;
        const res = await publicInstance.get(
          ROUTES.auth.refreshAccessToken.path,
        );
        return authInstance.request(error.config);
      }
    } catch {
      throw error;
    }
    throw error;
  },
);
