import type { CartItem, Product } from "@/domain/models";

export interface CartRepository {
  getItems(): CartItem[];
  add(product: Product, quantity: number): void;
  update(productId: number, quantity: number): void;
  remove(productId: number): void;
  clear(): void;
}
