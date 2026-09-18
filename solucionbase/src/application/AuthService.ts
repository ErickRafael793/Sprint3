import { AppError } from "@/core/AppError";
import type { AuthCredentials, Session } from "@/domain/models";
import { getRoleByUserId } from "@/domain/getRoleByUserId";
import type { AuthRepository, CartRepository, SessionRepository } from "@/domain/repository";

export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly cartRepository: CartRepository,
    private readonly isOnline: () => boolean,
  ) {}

  async login(credentials: AuthCredentials): Promise<Session> {
    const username = credentials.username.trim();
    const password = credentials.password.trim();

    if (!username || !password) {
      throw new AppError("INVALID_FIELDS", "Completa usuario y contraseña.");
    }

    if (!this.isOnline()) {
      throw new AppError("NO_CONNECTION", "No hay conexión a internet.");
    }

    const response = await this.authRepository.login({ username, password });
    const session: Session = {
      token: response.token,
      user: response.user,
      role: getRoleByUserId(response.user.id),
    };

    this.sessionRepository.saveSession(session);
    return session;
  }

  getSession(): Session | null {
    return this.sessionRepository.getSession();
  }

  logout(): void {
    this.cartRepository.clear();
    this.sessionRepository.clearSession();
  }
}
