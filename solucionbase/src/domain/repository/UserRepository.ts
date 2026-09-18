import type { User } from "@/domain/models";

export interface UserRepository {
  getAll(): Promise<User[]>;
}
