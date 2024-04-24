import { useAppSelector } from "@/app/hooks";
import { Navigate, Outlet } from "react-router-dom";

export default function AppLayout() {
  // user have permission to access
  const user = useAppSelector((state) => state.auth);

  if (!user.auth) return <Navigate to="/login" replace />;

  return (
    <div>
      <Outlet />
    </div>
  );
}
