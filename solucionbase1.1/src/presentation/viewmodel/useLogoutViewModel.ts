import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDependencies } from "@/app/DependenciesProvider";
import { APP_CONFIG } from "@/core/appConfig";
import { useAuth } from "@/presentation/context/AuthContext";

export function useLogoutViewModel() {
  const { authService } = useDependencies();
  const { clearSession } = useAuth();
  const navigate = useNavigate();
  const [confirming, setConfirming] = useState(false);

  const logout = () => {
    authService.logout();
    clearSession();
    navigate(`${APP_CONFIG.routes.login}?logout=success`, { replace: true });
  };

  return {
    confirming,
    requestLogout: () => setConfirming(true),
    cancelLogout: () => setConfirming(false),
    logout,
  };
}
