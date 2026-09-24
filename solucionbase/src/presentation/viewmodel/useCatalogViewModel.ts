import { useCallback, useEffect, useState } from "react";
import { useDependencies } from "@/app/DependenciesProvider";
import { AppError } from "@/core/AppError";
import type { Product } from "@/domain/models";
import { useAuth } from "@/presentation/context/AuthContext";

const ALL_CATEGORIES_OPTION = "Todos";

export function useCatalogViewModel() {
  const { productRepository } = useDependencies();
  const { session } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([ALL_CATEGORIES_OPTION]);
  const [category, setCategory] = useState(ALL_CATEGORIES_OPTION);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    productRepository
      .getAll()
      .then((result) => {
        if (active) setProducts(result);
      })
      .catch(() => {
        if (active) setError("No se pudo cargar el catálogo.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
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
    products: visibleProducts,
    loading,
    error,
    canCreateProduct: session?.role === "ADMIN",
  };
}
