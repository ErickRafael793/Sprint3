import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDependencies } from "@/app/DependenciesProvider";
import { APP_CONFIG } from "@/core/appConfig";
import type { Product } from "@/domain/models";

const NOT_FOUND_REDIRECT_DELAY_MS = 2000;

export function useProductDetailViewModel() {
  const { productRepository, cartRepository } = useDependencies();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const load = useCallback(() => {
    const numericId = Number(id);

    if (!id || Number.isNaN(numericId)) {
      setLoading(false);
      setNotFound(true);
      return;
    }

    setLoading(true);
    setNotFound(false);

    productRepository
      .getById(numericId)
      .then((result) => {
        if (!result) {
          setNotFound(true);
          return;
        }
        setProduct(result);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id, productRepository]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!notFound) return;

    const timeoutId = window.setTimeout(() => {
      navigate(APP_CONFIG.routes.catalog, { replace: true });
    }, NOT_FOUND_REDIRECT_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [notFound, navigate]);

  const addToCart = () => {
    if (!product) return;
    cartRepository.add(product, quantity);
    setMessage("Producto agregado al carrito.");
  };

  return {
    product,
    loading,
    notFound,
    quantity,
    message,
    decrease: () => setQuantity((current) => Math.max(1, current - 1)),
    increase: () => setQuantity((current) => current + 1),
    addToCart,
  };
}
