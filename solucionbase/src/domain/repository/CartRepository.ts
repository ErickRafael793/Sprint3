import type { CartItem, Product } from "@/domain/models";

export interface CartRepository {
  getItems(): CartItem[];
  add(product: Product, quantity: number): Promise<void>;
  update(productId: number, quantity: number): Promise<void>;
  remove(productId: number): Promise<void>;
  clear(): void;
}