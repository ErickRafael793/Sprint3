import { APP_CONFIG } from "@/core/appConfig";
import type { CartItem, Product } from "@/domain/models";
import type { CartRepository } from "@/domain/repository";

export class BrowserCartRepository implements CartRepository {
  getItems(): CartItem[] {
    const value = localStorage.getItem(APP_CONFIG.storage.cart);
    if (!value) return [];

    try {
      return JSON.parse(value) as CartItem[];
    } catch {
      this.clear();
      return [];
    }
  }

  add(product: Product, quantity: number): void {
    const items = this.getItems();
    const existing = items.find((item) => item.product.id === product.id);

    if (existing) existing.quantity += quantity;
    else items.push({ product, quantity });

    this.save(items);
  }

  update(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.remove(productId);
      return;
    }

    this.save(
      this.getItems().map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  }

  remove(productId: number): void {
    this.save(this.getItems().filter((item) => item.product.id !== productId));
  }

  clear(): void {
    localStorage.removeItem(APP_CONFIG.storage.cart);
  }

  private save(items: CartItem[]): void {
    localStorage.setItem(APP_CONFIG.storage.cart, JSON.stringify(items));
  }
}
