import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDependencies } from "@/app/DependenciesProvider";
import { APP_CONFIG } from "@/core/appConfig";
import { useAuth } from "@/presentation/context/AuthContext";
import {
  EMPTY_PRODUCT_FORM,
  toProductInput,
  type ProductFormErrors,
  type ProductFormValue,
  validateProductForm,
} from "./validateProductForm";

export function useCreateProductViewModel() {
  const { productRepository } = useDependencies();
  const { session } = useAuth();
  const navigate = useNavigate();
  const [value, setValue] = useState<ProductFormValue>(EMPTY_PRODUCT_FORM);
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const updateField = (field: keyof ProductFormValue, fieldValue: string) => {
    setValue((current) => ({ ...current, [field]: fieldValue }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setError("");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage("");
    setError("");

    if (session?.role !== "ADMIN") {
      navigate(APP_CONFIG.routes.catalog, { replace: true });
      return;
    }

    const nextErrors = validateProductForm(value);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    try {
      const created = await productRepository.create(toProductInput(value));
      setValue(EMPTY_PRODUCT_FORM);
      setErrors({});
      setSuccessMessage(`Producto creado correctamente. ID generado: ${created.id}.`);
    } catch {
      setError("No se pudo crear el producto. Intenta nuevamente.");
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
    cancel: () => navigate(APP_CONFIG.routes.catalog),
  };
}
