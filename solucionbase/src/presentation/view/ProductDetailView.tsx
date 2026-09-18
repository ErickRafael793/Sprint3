import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/presentation/context/AuthContext";
import { useProductDetailViewModel } from "@/presentation/viewmodel/useProductDetailViewModel";

export function ProductDetailView() {
  const vm = useProductDetailViewModel();
  const { session } = useAuth();
  const navigate = useNavigate();

  if (!vm.product) return <div className="loading">Cargando producto...</div>;

  return (
    <section className="detail-page">
      <button className="back-button" onClick={() => navigate(-1)}><ArrowLeft /> Detalle del producto</button>
      <img className="detail-image" src={vm.product.image} alt="" />
      <span className="eyebrow">{vm.product.category}</span>
      <h1>{vm.product.title}</h1>
      <div className="rating">★ {vm.product.rating?.rate ?? 4.5} ({vm.product.rating?.count ?? 0} reseñas)</div>
      <div className="price">${vm.product.price.toFixed(2)}</div>
      <h3>Descripción</h3>
      <p>{vm.product.description}</p>

      {session?.role === "CLIENT" && (
        <>
          <div className="quantity"><button onClick={vm.decrease}><Minus /></button><strong>{vm.quantity}</strong><button onClick={vm.increase}><Plus /></button></div>
          <button className="primary-button" onClick={vm.addToCart}><ShoppingCart /> Agregar al carrito</button>
          {vm.message && <div className="notice success">{vm.message}</div>}
        </>
      )}

      {session?.role === "ADMIN" && <div className="action-row"><button className="secondary-button">Editar</button><button className="danger-button">Eliminar</button></div>}
      {session?.role === "AUDITOR" && <div className="notice info"><strong>Modo consulta.</strong> Esta vista es únicamente de lectura.</div>}
    </section>
  );
}
