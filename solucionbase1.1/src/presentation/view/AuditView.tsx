import { useAuditViewModel } from "@/presentation/viewmodel/useAuditViewModel";

export function AuditView() {
  const { carts } = useAuditViewModel();
  return (
    <section>
      <div className="page-header"><div><span className="eyebrow">Solo lectura</span><h1>Carritos de auditoría</h1></div></div>
      <div className="audit-list">
        {carts.map((cart) => (
          <details key={cart.id}>
            <summary><span className="avatar">{cart.id}</span><div><strong>Carrito #{cart.id}</strong><small>Usuario #{cart.userId} · {cart.date}</small></div></summary>
            <div className="audit-products">{cart.products.map((product) => <span key={product.productId}>Producto #{product.productId} × {product.quantity}</span>)}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
