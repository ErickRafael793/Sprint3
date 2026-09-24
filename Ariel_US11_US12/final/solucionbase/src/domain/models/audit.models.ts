export interface AuditProduct {
  productId: number;
  quantity: number;
  title?: string;
}

export interface AuditCart {
  id: number;
  userId: number;
  date: string;
  products: AuditProduct[];
}
