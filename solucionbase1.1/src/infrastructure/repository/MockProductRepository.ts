import type { Product, ProductInput } from "@/domain/models";
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

  async create(input: ProductInput): Promise<Product> {
    await wait();
    return {
      ...input,
      id: 999,
      rating: { rate: 0, count: 0 },
    };
  }

  async update(id: number, input: ProductInput): Promise<Product> {
    await wait();
    return { ...input, id };
  }

  async delete(id: number): Promise<Product> {
    await wait();
    const product = MOCK_PRODUCTS.find((item) => item.id === id);
    if (!product) throw new Error("Producto no encontrado.");
    return structuredClone(product);
  }
}
