import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog } from "@/presentation/components/ConfirmDialog";
import { ProductForm } from "@/presentation/components/ProductForm";
import { useDeleteProductViewModel } from "@/presentation/viewmodel/useDeleteProductViewModel";
import { useEditProductViewModel } from "@/presentation/viewmodel/useEditProductViewModel";
import { useProductDetailViewModel } from "@/presentation/viewmodel/useProductDetailViewModel";

export function ProductDetailView() {
  const vm = useProductDetailViewModel();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [editMessage, setEditMessage] = useState("");
  const deleteVm = useDeleteProductViewModel(vm.product?.id ?? null);
  const editVm = useEditProductViewModel(vm.product, (updated) => {
    vm.setProduct(updated);
    setEditing(false);
  });

  if (vm.loading) return <div className="loading">Cargando producto...</div>;
  if (vm.error) return <div className="notice error" role="alert">{vm.error}</div>;
  if (!vm.product) return <div className="empty-state">No hay información del producto.</div>;

  return (
    <section className="detail-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ArrowLeft /> Detalle del producto
      </button>

      {editing && vm.isAdmin ? (
        <>
          <h1 className="form-title">Editar producto</h1>
          {editVm.successMessage && <div className="notice success" role="alert">{editVm.successMessage}</div>}
          {editVm.error && <div className="notice error" role="alert">{editVm.error}</div>}
          <ProductForm
            value={editVm.value}
            errors={editVm.errors}
            loading={editVm.loading}
            submitLabel="Guardar cambios"
            onChange={editVm.updateField}
            onSubmit={editVm.submit}
            onCancel={() => setEditing(false)}
          />
        </>
      ) : (
        <>
          <img className="detail-image" src={vm.product.image} alt={`Imagen de ${vm.product.title}`} />
          <span className="eyebrow">{vm.product.category}</span>
          <h1>{vm.product.title}</h1>
          <div className="rating">★ {vm.product.rating?.rate ?? 4.5} ({vm.product.rating?.count ?? 0} reseñas)</div>
          <div className="price">${vm.product.price.toFixed(2)}</div>
          <h3>Descripción</h3>
          <p>{vm.product.description}</p>

          {vm.isClient && (
            <>
              <div className="quantity">
                <button aria-label="Disminuir cantidad" onClick={vm.decrease}><Minus /></button>
                <strong>{vm.quantity}</strong>
                <button aria-label="Aumentar cantidad" onClick={vm.increase}><Plus /></button>
              </div>
              <button
                     className="primary-button"
                     disabled={vm.isSaving}
                     onClick={vm.addToCart}
              >
                  <ShoppingCart />
                   {vm.isSaving ? "Agregando..." : "Agregar al carrito"}
               </button>
              {vm.message && <div className="notice success" role="status">{vm.message}</div>}
            </>
          )}

          {vm.isAdmin && (
            <>
              {deleteVm.error && <div className="notice error" role="alert">{deleteVm.error}</div>}
              <div className="action-row">
                <button className="secondary-button" onClick={() => { setEditMessage(""); setEditing(true); }}>Editar</button>
                <button className="danger-button" onClick={deleteVm.requestDelete}>
                  <Trash2 /> Eliminar
                </button>
              </div>
            </>
          )}

          {vm.isAuditor && (
            <div className="notice info">
              <strong>Modo consulta.</strong> Esta vista es únicamente de lectura.
            </div>
          )}
        </>
      )}

      <ConfirmDialog
        open={deleteVm.confirmOpen}
        title="Eliminar producto"
        description="¿Estás seguro de eliminar este producto?"
        confirmLabel="Sí, eliminar"
        loading={deleteVm.loading}
        onCancel={deleteVm.cancel}
        onConfirm={deleteVm.confirm}
      />
    </section>
  );
}