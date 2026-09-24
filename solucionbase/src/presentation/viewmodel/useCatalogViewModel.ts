import { useEffect, useMemo, useState } from "react";
import { useDependencies } from "@/app/DependenciesProvider";
import type { Product } from "@/domain/models";
import { useAuth } from "@/presentation/context/AuthContext";

export function useCatalogViewModel() {
  const { productRepository } = useDependencies();
  const { session } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("Todos");
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

  const categories = useMemo(
    () => ["Todos", ...new Set(products.map((product) => product.category))],
    [products],
  );

  const visibleProducts = category === "Todos"
    ? products
    : products.filter((product) => product.category === category);

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