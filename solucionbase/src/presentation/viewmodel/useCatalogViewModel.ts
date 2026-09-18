import { useEffect, useMemo, useState } from "react";
import { useDependencies } from "@/app/DependenciesProvider";
import type { Product } from "@/domain/models";

export function useCatalogViewModel() {
  const { productRepository } = useDependencies();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("Todos");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productRepository.getAll().then(setProducts).finally(() => setLoading(false));
  }, [productRepository]);

  const categories = useMemo(
    () => ["Todos", ...new Set(products.map((product) => product.category))],
    [products],
  );

  const visibleProducts = category === "Todos"
    ? products
    : products.filter((product) => product.category === category);

  return { categories, category, setCategory, products: visibleProducts, loading };
}
