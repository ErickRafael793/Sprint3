import { APP_CONFIG } from "@/core/appConfig";
import { AppError } from "@/core/AppError";
import type { Product } from "@/domain/models";
import type { ProductRepository } from "@/domain/repository";
import { HttpClient, HttpError } from "@/infrastructure/http/HttpClient";

/**
 * Implementación real de ProductRepository.
 * Consume el catálogo público de Fake Store API (GET /products,
 * /products/{id}, /products/categories y /products/category/{category}).
 */
export class FakeStoreProductRepository implements ProductRepository {
  constructor(private readonly http: HttpClient) {}

  async getAll(): Promise<Product[]> {
    return this.fetchList(APP_CONFIG.api.endpoints.products);
  }

  async getById(id: number): Promise<Product | null> {
    if (!Number.isFinite(id)) return null;

    try {
      const product = await this.http.request<Product | null>(
        APP_CONFIG.api.endpoints.productById(id),
      );

      if (!product || !product.id) return null;
      return product;
    } catch (error) {
      throw this.toAppError(error, "No fue posible cargar el producto.");
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      return await this.http.request<string[]>(APP_CONFIG.api.endpoints.categories);
    } catch (error) {
      throw this.toAppError(error, "No fue posible cargar las categorías.");
    }
  }

  async getByCategory(category: string): Promise<Product[]> {
    return this.fetchList(APP_CONFIG.api.endpoints.productsByCategory(category));
  }

  private async fetchList(path: string): Promise<Product[]> {
    try {
      return await this.http.request<Product[]>(path);
    } catch (error) {
      throw this.toAppError(error, "No fue posible cargar el catálogo.");
    }
  }

  private toAppError(error: unknown, fallbackMessage: string): AppError {
    if (error instanceof HttpError && error.status === 0) {
      return new AppError("NO_CONNECTION", "No fue posible conectar con el servidor.");
    }

    return new AppError("SERVER_ERROR", fallbackMessage);
  }
}