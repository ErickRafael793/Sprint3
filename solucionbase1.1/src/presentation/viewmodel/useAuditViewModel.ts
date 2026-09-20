import { useEffect, useState } from "react";
import { useDependencies } from "@/app/DependenciesProvider";
import type { AuditCart } from "@/domain/models";

export function useAuditViewModel() {
  const { auditRepository } = useDependencies();
  const [carts, setCarts] = useState<AuditCart[]>([]);

  useEffect(() => {
    auditRepository.getAllCarts().then(setCarts);
  }, [auditRepository]);

  return { carts };
}
