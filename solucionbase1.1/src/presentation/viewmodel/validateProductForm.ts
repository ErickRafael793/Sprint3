import type { ProductInput } from "@/domain/models";

export type ProductFormValue = {
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
};

export type ProductFormErrors = Partial<Record<keyof ProductFormValue, string>>;

export function toProductFormValue(input: ProductInput): ProductFormValue {
  return {
    ...input,
    price: String(input.price),
  };
}

export function validateProductForm(value: ProductFormValue): ProductFormErrors {
  const errors: ProductFormErrors = {};
  const title = value.title.trim();
  const description = value.description.trim();
  const category = value.category.trim();
  const image = value.image.trim();
  const price = value.price.trim();

  if (!title) errors.title = "El título es obligatorio.";
  if (!price) errors.price = "El precio es obligatorio.";
  else if (!Number.isFinite(Number(price)) || Number(price) < 0) {
    errors.price = "El precio debe ser un número válido.";
  }
  if (!description) errors.description = "La descripción es obligatoria.";
  if (!category) errors.category = "La categoría es obligatoria.";

  if (!image) {
    errors.image = "La URL de imagen es obligatoria.";
  } else {
    try {
      const url = new URL(image);
      if (!["http:", "https:"].includes(url.protocol)) {
        errors.image = "La URL debe comenzar con http:// o https://.";
      }
    } catch {
      errors.image = "Ingresa una URL válida.";
    }
  }

  return errors;
}

export function toProductInput(value: ProductFormValue): ProductInput {
  return {
    title: value.title.trim(),
    price: Number(value.price),
    description: value.description.trim(),
    category: value.category.trim(),
    image: value.image.trim(),
  };
}

export const EMPTY_PRODUCT_FORM: ProductFormValue = {
  title: "",
  price: "",
  description: "",
  category: "",
  image: "",
};
