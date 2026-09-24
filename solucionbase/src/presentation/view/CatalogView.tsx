import { Plus, Search, ShoppingBag } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { APP_CONFIG } from "@/core/appConfig";
import { useCatalogViewModel } from "@/presentation/viewmodel/useCatalogViewModel";

export function CatalogView() {
  const vm = useCatalogViewModel();
  const navigate = useNavigate();
  const location = useLocation();

  const navigationMessage = (location.state as { message?: string } | null)?.message;

  return (
    <section>
      <div className="page-header">
        <div><span className="eyebrow">Catálogo</span><h1>Descubre productos</h1></div>
        <div className="header-actions">
          {vm.canCreateProduct && (
            <button className="secondary-button compact-button" onClick={() => navigate(APP_CONFIG.routes.newProduct)}>
              <Plus size={18} /> Nuevo
            </button>
          )}
          <button className="icon-button" aria-label="Buscar"><Search /></button>
        </div>
      </div>

      {navigationMessage && <div className="notice success" role="status">{navigationMessage}</div>}

      <div className="chips">
        {vm.categories.map((category) => (
          <button key={category} className={vm.category === category ? "selected" : ""} onClick={() => vm.setCategory(category)}>
            {category}
          </button>
        ))}
      </div>

      {vm.error && <div className="notice error" role="alert">{vm.error}</div>}\n\n      {vm.loading ? <div className="loading">Cargando catálogo...</div> : (
        <div className="product-grid">
          {vm.products.map((product) => (
            <article
              className="product-card"
              key={product.id}
              tabIndex={0}
              role="button"
              onClick={() => navigate(APP_CONFIG.routes.product(product.id))}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") navigate(APP_CONFIG.routes.product(product.id));
              }}
            >
              <img src={product.image} alt={`Imagen de ${product.title}`} />
              <span>{product.category}</span>
              <h2>{product.title}</h2>
              <strong>${product.price.toFixed(2)}</strong>
            </article>
          ))}
        </div>
      )}

      {!vm.loading && !vm.error && vm.products.length === 0 && (
        <div className="empty-state"><ShoppingBag /><strong>No hay productos</strong></div>
      )}
    </section>
  );
}