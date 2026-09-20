import type { Product, ProductInput } from "@/domain/models";

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: number): Promise<Product | null>;
  create(input: ProductInput): Promise<Product>;
  update(id: number, input: ProductInput): Promise<Product>;
  delete(id: number): Promise<Product>;
}
