import { Plus } from "lucide-react";
import { ProductForm } from "@/presentation/components/ProductForm";
import { useCreateProductViewModel } from "@/presentation/viewmodel/useCreateProductViewModel";

export function CreateProductView() {
  const vm = useCreateProductViewModel();

  return (
    <section className="form-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">Inventario</span>
          <h1>Agregar producto</h1>
        </div>
        <Plus aria-hidden="true" />
      </div>

      <p className="form-intro">
        Registra un nuevo artículo en el inventario mediante la Fake Store API.
      </p>

      {vm.successMessage && <div className="notice success" role="alert">{vm.successMessage}</div>}
      {vm.error && <div className="notice error" role="alert">{vm.error}</div>}

      <ProductForm
        value={vm.value}
        errors={vm.errors}
        loading={vm.loading}
        submitLabel="Guardar producto"
        onChange={(field, value) => vm.updateField(field as any, value)}
        onSubmit={vm.submit}
        onCancel={vm.cancel}
      />
    </section>
  );
}