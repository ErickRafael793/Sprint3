export interface AuditProduct {
  productId: number;
  quantity: number;
}

export interface AuditCart {
  id: number;
  userId: number;
  date: string;
  products: AuditProduct[];
}
