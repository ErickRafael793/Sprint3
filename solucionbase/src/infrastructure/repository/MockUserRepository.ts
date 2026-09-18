import type { User } from "@/domain/models";
import type { UserRepository } from "@/domain/repository";
import { MOCK_USERS, wait } from "@/mocks/mockData";

export class MockUserRepository implements UserRepository {
  async getAll(): Promise<User[]> {
    await wait();
    return structuredClone(MOCK_USERS);
  }
}
