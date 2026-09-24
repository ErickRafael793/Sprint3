import type { Product, ProductInput } from "@/domain/models";
import type { ProductRepository } from "@/domain/repository";
import { HttpClient } from "@/infrastructure/http/HttpClient";

export class FakeStoreProductRepository implements ProductRepository {
  constructor(private readonly http: HttpClient) {}

  getAll(): Promise<Product[]> {
    return this.http.request<Product[]>("/products");
  }

  getById(id: number): Promise<Product> {
    return this.http.request<Product>(`/products/${id}`);
  }

  create(input: ProductInput): Promise<Product> {
    return this.http.request<Product>("/products", {
      method: "POST",
      body: JSON.stringify(input),
    });
  }

  update(id: number, input: ProductInput): Promise<Product> {
    return this.http.request<Product>(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(input),
    });
  }

  delete(id: number): Promise<Product> {
    return this.http.request<Product>(`/products/${id}`, {
      method: "DELETE",
    });
  }
}