import { Navigate, Outlet } from "react-router-dom";
import { APP_CONFIG } from "@/core/appConfig";
import { useAuth } from "@/presentation/context/AuthContext";

export function ProtectedRoute() {
  const { session } = useAuth();
  return session ? <Outlet /> : <Navigate to={APP_CONFIG.routes.login} replace />;
}
