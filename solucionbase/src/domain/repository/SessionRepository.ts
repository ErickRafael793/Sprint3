import type { Session } from "@/domain/models";

export interface SessionRepository {
  getSession(): Session | null;
  saveSession(session: Session): void;
  clearSession(): void;
}
