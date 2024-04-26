import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout, AuthLayout } from "@/layouts";
import Home from "@/pages/home";
import Login from "@/pages/login";
import NotFound from "@/pages/404";
import Register from "@/pages/register";
import ResetPassword from "@/pages/reset-password";
import ForgotPassword from "@/pages/forgot-password";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          {/* app pages */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
          </Route>
          {/* auth pages */}
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
