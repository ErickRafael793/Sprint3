import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { APP_CONFIG } from "@/core/appConfig";
import { useCartViewModel } from "@/presentation/viewmodel/useCartViewModel";

export function CartView() {
  const vm = useCartViewModel();
  const navigate = useNavigate();

  return (
    <section>
      <div className="page-header"><div><span className="eyebrow">Compra</span><h1>Mi carrito</h1></div></div>
      {vm.items.length === 0 ? (
        <div className="empty-state"><ShoppingCart /><strong>Tu carrito está vacío</strong><button className="primary-button" onClick={() => navigate(APP_CONFIG.routes.catalog)}>Ver catálogo</button></div>
      ) : (
        <>
          <div className="cart-list">
            {vm.items.map((item) => (
              <article className="cart-item" key={item.product.id}>
                <img src={item.product.image} alt="" />
                <div><strong>{item.product.title}</strong><span>${item.product.price.toFixed(2)}</span></div>
                <div className="quantity compact"><button onClick={() => vm.update(item.product.id, item.quantity - 1)}><Minus /></button><strong>{item.quantity}</strong><button onClick={() => vm.update(item.product.id, item.quantity + 1)}><Plus /></button></div>
                <button className="icon-button danger" onClick={() => vm.remove(item.product.id)}><Trash2 /></button>
              </article>
            ))}
          </div>
          <div className="total"><span>Total</span><strong>${vm.total.toFixed(2)}</strong></div>
          <button className="primary-button">Proceder al pago</button>
        </>
      )}
    </section>
  );
}
