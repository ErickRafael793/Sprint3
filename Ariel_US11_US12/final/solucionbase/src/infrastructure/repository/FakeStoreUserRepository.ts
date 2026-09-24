import { APP_CONFIG } from "@/core/appConfig";
import { AppError } from "@/core/AppError";
import type { User } from "@/domain/models";
import type { UserRepository } from "@/domain/repository";
import { HttpClient, HttpError } from "@/infrastructure/http/HttpClient";

export class FakeStoreUserRepository implements UserRepository {
  constructor(private readonly http: HttpClient) {}

  async getAll(): Promise<User[]> {
    try {
      const users = await this.http.request<User[]>(APP_CONFIG.api.endpoints.users);
      return Array.isArray(users) ? users : [];
    } catch (error) {
      if (error instanceof HttpError && error.status === 0) {
        throw new AppError("NO_CONNECTION", "No fue posible conectar con el servidor.");
      }

      throw new AppError("SERVER_ERROR", "No fue posible cargar los usuarios.");
    }
  }
}
