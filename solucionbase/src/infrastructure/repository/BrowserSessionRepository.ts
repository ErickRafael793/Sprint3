import { APP_CONFIG } from "@/core/appConfig";
import type { Session } from "@/domain/models";
import type { SessionRepository } from "@/domain/repository";

export class BrowserSessionRepository implements SessionRepository {
  getSession(): Session | null {
    const value = localStorage.getItem(APP_CONFIG.storage.session);
    if (!value) return null;

    try {
      return JSON.parse(value) as Session;
    } catch {
      this.clearSession();
      return null;
    }
  }

  saveSession(session: Session): void {
    localStorage.setItem(APP_CONFIG.storage.session, JSON.stringify(session));
  }

  clearSession(): void {
    localStorage.removeItem(APP_CONFIG.storage.session);
  }
}
