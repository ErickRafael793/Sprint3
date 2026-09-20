import { useEffect, useState, type FormEvent } from "react";
import { useDependencies } from "@/app/DependenciesProvider";
import type { Product } from "@/domain/models";
import {
  toProductFormValue,
  toProductInput,
  type ProductFormErrors,
  type ProductFormValue,
  validateProductForm,
} from "./validateProductForm";

export function useEditProductViewModel(
  product: Product | null,
  onUpdated: (product: Product) => void,
) {
  const { productRepository } = useDependencies();
  const [value, setValue] = useState<ProductFormValue>(() =>
    product ? toProductFormValue(product) : {
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    },
  );
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (product) {
      setValue(toProductFormValue(product));
      setErrors({});
      setError("");
      setSuccessMessage("");
    }
  }, [product?.id]);

  const updateField = (field: keyof ProductFormValue, fieldValue: string) => {
    setValue((current) => ({ ...current, [field]: fieldValue }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setError("");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!product) return;

    const nextErrors = validateProductForm(value);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    try {
      const updated = await productRepository.update(product.id, toProductInput(value));
      onUpdated(updated);
      setSuccessMessage("Producto actualizado (Simulación).");
    } catch {
      setError("No se pudo actualizar el producto. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return {
    value,
    errors,
    loading,
    error,
    successMessage,
    updateField,
    submit,
  };
}
