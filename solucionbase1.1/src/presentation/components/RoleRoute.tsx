import { Navigate, Outlet } from "react-router-dom";
import { APP_CONFIG } from "@/core/appConfig";
import type { UserRole } from "@/domain/models";
import { useAuth } from "@/presentation/context/AuthContext";

export function RoleRoute({ allowed }: { allowed: UserRole[] }) {
  const { session } = useAuth();
  return session && allowed.includes(session.role)
    ? <Outlet />
    : <Navigate to={APP_CONFIG.routes.catalog} replace />;
}
