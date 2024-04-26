import axios from "axios";
import { env } from "./env";

// api backend
export const api = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

// interceptors
api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
          withCredentials: true,
        });
        return api.request(originalRequest);
      } catch (err: any) {}
    }

    throw error;
  }
);
