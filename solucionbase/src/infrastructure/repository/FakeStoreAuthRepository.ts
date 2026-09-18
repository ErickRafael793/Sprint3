import { APP_CONFIG } from "@/core/appConfig";
import { AppError } from "@/core/AppError";
import type { AuthCredentials, AuthResponse, User } from "@/domain/models";
import type { AuthRepository } from "@/domain/repository";
import { HttpClient, HttpError } from "@/infrastructure/http/HttpClient";

interface LoginApiResponse {
  token: string;
}

export class FakeStoreAuthRepository implements AuthRepository {
  constructor(private readonly http: HttpClient) {}

  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    try {
      const response = await this.http.request<LoginApiResponse>(
        APP_CONFIG.api.endpoints.login,
        {
          method: "POST",
          body: JSON.stringify(credentials),
        },
      );

      if (!response.token) {
        throw new AppError("SERVER_ERROR", "La API no devolvió un token válido.");
      }

      const users = await this.http.request<User[]>(APP_CONFIG.api.endpoints.users);
      const user = users.find((candidate) => candidate.username === credentials.username);

      if (!user) {
        throw new AppError("SERVER_ERROR", "No se encontró la información del usuario.");
      }

      return { token: response.token, user };
    } catch (error) {
      if (error instanceof AppError) throw error;

      if (error instanceof HttpError && error.status === 0) {
        throw new AppError("NO_CONNECTION", "No fue posible conectar con el servidor.");
      }

      if (error instanceof HttpError && [400, 401, 403].includes(error.status)) {
        throw new AppError("INVALID_CREDENTIALS", "Usuario o contraseña inválidos.");
      }

      throw new AppError("SERVER_ERROR", "Ocurrió un error inesperado en el servidor.");
    }
  }
}
