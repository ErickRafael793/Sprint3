import { useCallback, useEffect, useState } from "react";
import { useDependencies } from "@/app/DependenciesProvider";
import { AppError } from "@/core/AppError";
import type { Product } from "@/domain/models";

const ALL_CATEGORIES_OPTION = "Todos";

export function useCatalogViewModel() {
  const { productRepository } = useDependencies();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([ALL_CATEGORIES_OPTION]);
  const [category, setCategory] = useState(ALL_CATEGORIES_OPTION);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCategories = useCallback(() => {
    productRepository
      .getCategories()
      .then((apiCategories) => setCategories([ALL_CATEGORIES_OPTION, ...apiCategories]))
      .catch(() => {
        // Las categorías son un complemento del filtro; si la petición falla,
        // el catálogo general (GET /products) sigue disponible con "Todos".
        console.error("No fue posible obtener las categorías del catálogo.");
        setCategories([ALL_CATEGORIES_OPTION]);
      });
  }, [productRepository]);

  const loadProducts = useCallback(
    (targetCategory: string) => {
      setLoading(true);
      setError("");
      setProducts([]); // limpia el arreglo anterior para no mostrar datos obsoletos

      const request = targetCategory === ALL_CATEGORIES_OPTION
        ? productRepository.getAll()
        : productRepository.getByCategory(targetCategory);

      request
        .then(setProducts)
        .catch((caughtError) => {
          setError(
            caughtError instanceof AppError
              ? caughtError.message
              : "No se pudo cargar el catálogo. Intenta de nuevo.",
          );
        })
        .finally(() => setLoading(false));
    },
    [productRepository],
  );

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    loadProducts(category);
  }, [category, loadProducts]);

  return {
    categories,
    category,
    setCategory,
    products,
    loading,
    error,
    retry: () => loadProducts(category),
  };
}
