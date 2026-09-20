import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDependencies } from "@/app/DependenciesProvider";
import type { Product } from "@/domain/models";
import { useAuth } from "@/presentation/context/AuthContext";

export function useProductDetailViewModel() {
  const { productRepository, cartRepository } = useDependencies();
  const { session } = useAuth();
  const { id } = useParams();
  const productId = Number(id);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    if (!Number.isInteger(productId) || productId <= 0) {
      setError("El identificador del producto no es válido.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    productRepository
      .getById(productId)
      .then((result) => {
        if (!active) return;
        if (!result) {
          setError("No se encontró el producto.");
          setProduct(null);
          return;
        }
        setProduct(result);
      })
      .catch(() => {
        if (active) setError("No se pudo cargar el producto.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [productId, productRepository]);

  const addToCart = () => {
    if (!product) return;
    cartRepository.add(product, quantity);
    setMessage("Producto agregado al carrito.");
  };

  return {
    product,
    setProduct,
    quantity,
    message,
    loading,
    error,
    isAdmin: session?.role === "ADMIN",
    isClient: session?.role === "CLIENT",
    isAuditor: session?.role === "AUDITOR",
    decrease: () => setQuantity((current) => Math.max(1, current - 1)),
    increase: () => setQuantity((current) => current + 1),
    addToCart,
  };
}
