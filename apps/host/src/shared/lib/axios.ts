import axios from "axios";

import { settings } from "./env";

export const publicInstance = axios.create({
  baseURL: settings.NEXT_PUBLIC_API_URL,
});

export const authInstance = axios.create({
  baseURL: settings.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

authInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const { status } = error.response;
      if (status == 401 && !error.response._retry) {
        error.response._retry = true;
        return authInstance.request(error.config);
      }
    } catch {
      throw error;
    }
    throw error;
  },
);
