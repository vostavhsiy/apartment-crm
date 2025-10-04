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

let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

function subscribeTokenRefresh(cb: () => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed() {
  refreshSubscribers.forEach((cb) => cb());
  refreshSubscribers = [];
}

authInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const res = await publicInstance.get(
            ROUTES.auth.refreshAccessToken.path,
          );

          isRefreshing = false;
          onRefreshed();

          return authInstance(originalRequest);
        } catch (err) {
          isRefreshing = false;
          return Promise.reject(err);
        }
      }

      return new Promise((resolve) => {
        subscribeTokenRefresh(() => {
          resolve(authInstance(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  },
);
