import { useCallback, useEffect, useState } from "react";
import { useDependencies } from "@/app/DependenciesProvider";
import { AppError } from "@/core/AppError";
import type { AuditCart } from "@/domain/models";

export function useAuditViewModel() {
  const { auditRepository } = useDependencies();
  const [carts, setCarts] = useState<AuditCart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      setCarts(await auditRepository.getAllCarts());
    } catch (caughtError) {
      setCarts([]);
      setError(
        caughtError instanceof AppError
          ? caughtError.message
          : "No fue posible cargar el histórico de carritos.",
      );
    } finally {
      setLoading(false);
    }
  }, [auditRepository]);

  useEffect(() => {
    void load();
  }, [load]);

  return { carts, loading, error, retry: load };
}
