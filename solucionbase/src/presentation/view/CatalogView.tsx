import { Search, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { APP_CONFIG } from "@/core/appConfig";
import { useCatalogViewModel } from "@/presentation/viewmodel/useCatalogViewModel";

export function CatalogView() {
  const vm = useCatalogViewModel();
  const navigate = useNavigate();

  return (
    <section>
      <div className="page-header">
        <div><span className="eyebrow">Catálogo</span><h1>Descubre productos</h1></div>
        <button className="icon-button" aria-label="Buscar"><Search /></button>
      </div>

      <div className="chips">
        {vm.categories.map((category) => (
          <button key={category} className={vm.category === category ? "selected" : ""} onClick={() => vm.setCategory(category)}>{category}</button>
        ))}
      </div>

      {vm.loading ? <div className="loading">Cargando catálogo...</div> : (
        <div className="product-grid">
          {vm.products.map((product) => (
            <article className="product-card" key={product.id} onClick={() => navigate(APP_CONFIG.routes.product(product.id))}>
              <img src={product.image} alt="" />
              <span>{product.category}</span>
              <h2>{product.title}</h2>
              <strong>${product.price.toFixed(2)}</strong>
            </article>
          ))}
        </div>
      )}

      {!vm.loading && vm.products.length === 0 && <div className="empty-state"><ShoppingBag /><strong>No hay productos</strong></div>}
    </section>
  );
}
