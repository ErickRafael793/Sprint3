import type { Product } from "@/domain/models";
import type { ProductRepository } from "@/domain/repository";
import { MOCK_PRODUCTS, wait } from "@/mocks/mockData";

export class MockProductRepository implements ProductRepository {
  async getAll(): Promise<Product[]> {
    await wait();
    return structuredClone(MOCK_PRODUCTS);
  }

  async getById(id: number): Promise<Product | null> {
    await wait();
    return structuredClone(MOCK_PRODUCTS.find((product) => product.id === id) ?? null);
  }
}
