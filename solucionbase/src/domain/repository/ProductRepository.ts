import type { Product } from "@/domain/models";

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: number): Promise<Product | null>;
  getCategories(): Promise<string[]>;
  getByCategory(category: string): Promise<Product[]>;
}
