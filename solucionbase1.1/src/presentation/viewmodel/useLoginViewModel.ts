import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDependencies } from "@/app/DependenciesProvider";
import { APP_CONFIG } from "@/core/appConfig";
import { AppError } from "@/core/AppError";
import { useAuth } from "@/presentation/context/AuthContext";

export function useLoginViewModel() {
  const { authService } = useDependencies();
  const { setSession } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Completa usuario y contraseña.");
      return;
    }

    try {
      setLoading(true);
      const session = await authService.login({ username, password });
      setSession(session);
      navigate(APP_CONFIG.routes.catalog, { replace: true });
    } catch (caughtError) {
      setError(
        caughtError instanceof AppError
          ? caughtError.message
          : "Ocurrió un error inesperado.",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    password,
    error,
    loading,
    setUsername,
    setPassword,
    submit,
  };
}
