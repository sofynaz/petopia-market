import { useAppSelector } from "@/app/hooks";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {
  const user = useAppSelector((state) => state.auth);

  if (user.auth) return <Navigate to="/" replace />;

  return (
    <main>
      <Outlet />
    </main>
  );
}
