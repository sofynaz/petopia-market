import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout, AuthLayout } from "@/layouts";
import Home from "@/pages/home";
import Login from "@/pages/login";
import NotFound from "@/pages/404";
import Signup from "@/pages/signup";

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
            <Route path="signup" element={<Signup />} />
          </Route>
          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
