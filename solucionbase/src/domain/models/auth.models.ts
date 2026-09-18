import type { User } from "./user.models";

export type UserRole = "ADMIN" | "AUDITOR" | "CLIENT";

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Session {
  token: string;
  user: User;
  role: UserRole;
}
