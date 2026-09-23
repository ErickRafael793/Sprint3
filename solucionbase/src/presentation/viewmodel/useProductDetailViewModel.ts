import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDependencies } from "@/app/DependenciesProvider";
import type { Product } from "@/domain/models";

export function useProductDetailViewModel() {
  const { productRepository, cartRepository } = useDependencies();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    productRepository.getById(Number(id)).then(setProduct);
  }, [id, productRepository]);

  const addToCart = async () => {
    if (!product) return;
    setIsSaving(true);
    setMessage("");
    try {
      await cartRepository.add(product, quantity);
      setMessage("Producto agregado al carrito.");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    product,
    quantity,
    message,
    isSaving,
    decrease: () => setQuantity((current) => Math.max(1, current - 1)),
    increase: () => setQuantity((current) => current + 1),
    addToCart,
  };
}