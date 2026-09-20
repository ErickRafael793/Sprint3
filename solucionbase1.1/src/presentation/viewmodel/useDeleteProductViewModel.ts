import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDependencies } from "@/app/DependenciesProvider";
import { APP_CONFIG } from "@/core/appConfig";
import { useAuth } from "@/presentation/context/AuthContext";

export function useDeleteProductViewModel(productId: number | null) {
  const { productRepository } = useDependencies();
  const { session } = useAuth();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const requestDelete = () => {
    if (session?.role !== "ADMIN" || productId === null) {
      navigate(APP_CONFIG.routes.catalog, { replace: true });
      return;
    }
    setError("");
    setConfirmOpen(true);
  };

  const cancel = () => {
    if (!loading) setConfirmOpen(false);
  };

  const confirm = async () => {
    if (session?.role !== "ADMIN" || productId === null) {
      setConfirmOpen(false);
      navigate(APP_CONFIG.routes.catalog, { replace: true });
      return;
    }

    setLoading(true);
    setError("");
    try {
      await productRepository.delete(productId);
      setConfirmOpen(false);
      navigate(APP_CONFIG.routes.catalog, {
        replace: true,
        state: { message: "Producto eliminado correctamente (Simulación)." },
      });
    } catch {
      setError("No se pudo eliminar el producto. Intenta nuevamente.");
      setLoading(false);
    }
  };

  return { confirmOpen, loading, error, requestDelete, cancel, confirm };
}
