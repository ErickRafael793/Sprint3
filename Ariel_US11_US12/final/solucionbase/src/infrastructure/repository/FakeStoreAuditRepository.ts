import { AppError } from "@/core/AppError";
import type { AuditCart, Product } from "@/domain/models";
import type { AuditRepository } from "@/domain/repository";
import { HttpClient, HttpError } from "@/infrastructure/http/HttpClient";

const CARTS_ENDPOINT = "/carts";
const PRODUCTS_ENDPOINT = "/products";

export class FakeStoreAuditRepository implements AuditRepository {
  constructor(private readonly http: HttpClient) {}

  async getAllCarts(): Promise<AuditCart[]> {
    let carts: AuditCart[];

    try {
      carts = await this.http.request<AuditCart[]>(CARTS_ENDPOINT);
    } catch (error) {
      if (error instanceof HttpError && error.status === 0) {
        throw new AppError("NO_CONNECTION", "No fue posible conectar con el servidor.");
      }

      throw new AppError("SERVER_ERROR", "No fue posible cargar el histórico de carritos.");
    }

    try {
      const products = await this.http.request<Product[]>(PRODUCTS_ENDPOINT);
      const titles = new Map(products.map((product) => [product.id, product.title]));

      return carts.map((cart) => ({
        ...cart,
        products: cart.products.map((product) => ({
          ...product,
          title: titles.get(product.productId),
        })),
      }));
    } catch {
      return carts;
    }
  }
}
