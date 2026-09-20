import type { Product } from "@/domain/models";
import type { ProductRepository } from "@/domain/repository";
import { MOCK_PRODUCTS, wait } from "@/mocks/mockData";

/**
 * Implementación mock de ProductRepository, útil para desarrollo sin red
 * y como sustituto intercambiable de FakeStoreProductRepository (LSP).
 */
export class MockProductRepository implements ProductRepository {
  async getAll(): Promise<Product[]> {
    await wait();
    return structuredClone(MOCK_PRODUCTS);
  }

  async getById(id: number): Promise<Product | null> {
    await wait();
    return structuredClone(MOCK_PRODUCTS.find((product) => product.id === id) ?? null);
  }

  async getCategories(): Promise<string[]> {
    await wait();
    return [...new Set(MOCK_PRODUCTS.map((product) => product.category))];
  }

  async getByCategory(category: string): Promise<Product[]> {
    await wait();
    return structuredClone(MOCK_PRODUCTS.filter((product) => product.category === category));
  }
}