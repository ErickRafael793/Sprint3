import type { FormEvent } from "react";
import type {
  ProductFormErrors,
  ProductFormValue,
} from "@/presentation/viewmodel/validateProductForm";

interface ProductFormProps {
  value: ProductFormValue;
  errors: ProductFormErrors;
  loading: boolean;
  submitLabel: string;
  onChange: (field: keyof ProductFormValue, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel?: () => void;
}

const fields: Array<{
  key: keyof ProductFormValue;
  label: string;
  type: "text" | "number" | "url";
  placeholder: string;
}> = [

export function ProductForm({
  value,
  errors,
  loading,
  submitLabel,
  onChange,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  return (
    <form className="product-form" onSubmit={onSubmit} noValidate>
      {fields.map((field) => (
        <label key={field.key}>
          <span>{field.label}</span>
          <input
            type={field.type}
            value={String(value[field.key])}
            onChange={(event) => onChange(field.key, event.target.value)}
            aria-invalid={Boolean(errors[field.key])}
            aria-describedby={errors[field.key] ? `${field.key}-error` : undefined}
            placeholder={field.placeholder}
            step={field.key === "price" ? "0.01" : undefined}
          />
          {errors[field.key] && (
            <small id={`${field.key}-error`} className="field-error">
              {errors[field.key]}
            </small>
          )}
        </label>
      ))}

      <div className="action-row">
        {onCancel && (
          <button type="button" className="secondary-button" onClick={onCancel} disabled={loading}>
            Cancelar
          </button>
        )}
        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? "Guardando..." : submitLabel}
        </button>
      </div>
    </form>
  );
}