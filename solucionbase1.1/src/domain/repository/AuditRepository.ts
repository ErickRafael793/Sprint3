import type { AuditCart } from "@/domain/models";

export interface AuditRepository {
  getAllCarts(): Promise<AuditCart[]>;
}
