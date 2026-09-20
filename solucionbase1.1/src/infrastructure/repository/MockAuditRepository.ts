import type { AuditCart } from "@/domain/models";
import type { AuditRepository } from "@/domain/repository";
import { MOCK_AUDIT_CARTS, wait } from "@/mocks/mockData";

export class MockAuditRepository implements AuditRepository {
  async getAllCarts(): Promise<AuditCart[]> {
    await wait();
    return structuredClone(MOCK_AUDIT_CARTS);
  }
}
