import axios from "axios";
import { env } from "@/lib/env";
import { api } from "@/lib/axios";

export const login = (username: string, password: string) =>
  axios.post<Auth.LoginResp>(
    `${env.VITE_API_URL}/auth/login`,
    {
      username,
      password,
    },
    { withCredentials: true }
  );

export const register = (data: object) => api.post("/auth/register", data);

export const logout = () => api.post("/auth/logout");
