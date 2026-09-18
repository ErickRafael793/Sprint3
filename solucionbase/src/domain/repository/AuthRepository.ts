import type { AuthCredentials, AuthResponse } from "@/domain/models";

export interface AuthRepository {
  login(credentials: AuthCredentials): Promise<AuthResponse>;
}
