import type { Product } from "./product.models";

export interface CartItem {
  product: Product;
  quantity: number;
}
