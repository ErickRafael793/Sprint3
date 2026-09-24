import { APP_CONFIG } from "@/core/appConfig";
import type { CartItem, Product } from "@/domain/models";
import type { CartRepository } from "@/domain/repository";
import type { HttpClient } from "@/infrastructure/http/HttpClient";

export class BrowserCartRepository implements CartRepository {
  constructor(private readonly http: HttpClient) {}

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

  async add(product: Product, quantity: number): Promise<void> {
    await this.syncCart(APP_CONFIG.api.endpoints.carts, "POST", {
      productId: product.id,
      quantity,
    });

    const items = this.getItems();
    const existing = items.find((item) => item.product.id === product.id);

    if (existing) existing.quantity += quantity;
    else items.push({ product, quantity });

    this.save(items);
  }

  async update(productId: number, quantity: number): Promise<void> {
    if (quantity <= 0) {
      await this.remove(productId);
      return;
    }

    await this.syncCart(`${APP_CONFIG.api.endpoints.carts}/${productId}`, "PUT", {
      productId,
      quantity,
    });

    this.save(
      this.getItems().map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  }

  async remove(productId: number): Promise<void> {
    await this.syncCart(`${APP_CONFIG.api.endpoints.carts}/${productId}`, "DELETE");

    this.save(this.getItems().filter((item) => item.product.id !== productId));
  }

  clear(): void {
    localStorage.removeItem(APP_CONFIG.storage.cart);
  }

  private save(items: CartItem[]): void {
    localStorage.setItem(APP_CONFIG.storage.cart, JSON.stringify(items));
  }

  private async syncCart(
    path: string,
    method: "POST" | "PUT" | "DELETE",
    body?: Record<string, unknown>,
  ): Promise<void> {
    try {
      await this.http.request(path, {
        method,
        body: body ? JSON.stringify(body) : undefined,
      });
    } catch (error) {
      console.warn(`No se pudo sincronizar el carrito (${method} ${path}).`, error);
    }
  }
}