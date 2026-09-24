import { AlertTriangle, ClipboardList } from "lucide-react";
import { useAuditViewModel } from "@/presentation/viewmodel/useAuditViewModel";

const formatDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("es-MX", { dateStyle: "medium" }).format(date);
};

export function AuditView() {
  const vm = useAuditViewModel();

  return (
    <section>
      <div className="page-header">
        <div>
          <span className="eyebrow">Solo lectura</span>
          <h1>Carritos de auditoría</h1>
        </div>
      </div>

      {vm.loading && (
        <div className="loading" role="status" aria-live="polite">
          Cargando histórico de carritos...
        </div>
      )}

      {!vm.loading && vm.error && (
        <div className="empty-state" role="alert">
          <AlertTriangle />
          <strong>{vm.error}</strong>
          <button className="primary-button" onClick={vm.retry}>Reintentar</button>
        </div>
      )}

      {!vm.loading && !vm.error && vm.carts.length === 0 && (
        <div className="empty-state">
          <ClipboardList />
          <strong>No hay carritos para auditar</strong>
        </div>
      )}

      {!vm.loading && !vm.error && vm.carts.length > 0 && (
        <div className="audit-list">
          {vm.carts.map((cart) => (
            <details key={cart.id}>
              <summary>
                <span className="avatar">{cart.id}</span>
                <div>
                  <strong>Carrito #{cart.id}</strong>
                  <small>Usuario #{cart.userId} · {formatDate(cart.date)}</small>
                </div>
              </summary>
              <div className="audit-products">
                {cart.products.map((product) => (
                  <span key={product.productId}>
                    {product.title ?? `Producto #${product.productId}`} × {product.quantity}
                  </span>
                ))}
              </div>
            </details>
          ))}
        </div>
      )}
    </section>
  );
}
