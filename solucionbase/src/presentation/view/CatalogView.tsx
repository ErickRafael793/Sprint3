import { AlertTriangle, Search, ShoppingBag } from "lucide-react";
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

      <div className="chips" role="group" aria-label="Filtrar por categoría">
        {vm.categories.map((category) => (
          <button
            key={category}
            className={vm.category === category ? "selected" : ""}
            aria-pressed={vm.category === category}
            onClick={() => vm.setCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {vm.loading && (
        <div className="loading" role="status" aria-live="polite">Cargando catálogo...</div>
      )}

      {!vm.loading && vm.error && (
        <div className="empty-state" role="alert">
          <AlertTriangle />
          <strong>{vm.error}</strong>
          <button className="primary-button" onClick={vm.retry}>Reintentar</button>
        </div>
      )}

      {!vm.loading && !vm.error && (
        <div className="product-grid">
          {vm.products.map((product) => (
            <article
              className="product-card"
              key={product.id}
              tabIndex={0}
              role="button"
              onClick={() => navigate(APP_CONFIG.routes.product(product.id))}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  navigate(APP_CONFIG.routes.product(product.id));
                }
              }}
            >
              <img src={product.image} alt="" loading="lazy" decoding="async" />
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
