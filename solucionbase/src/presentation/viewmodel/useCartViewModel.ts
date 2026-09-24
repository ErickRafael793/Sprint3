import { useMemo, useState } from "react";
import { useDependencies } from "@/app/DependenciesProvider";

export function useCartViewModel() {
  const { cartRepository } = useDependencies();
  const [items, setItems] = useState(() => cartRepository.getItems());
  const [isSaving, setIsSaving] = useState(false);

  const refresh = () => setItems(cartRepository.getItems());

  const update = async (productId: number, quantity: number) => {
    setIsSaving(true);
    try {
      await cartRepository.update(productId, quantity);
      refresh();
    } finally {
      setIsSaving(false);
    }
  };

  const remove = async (productId: number) => {
    setIsSaving(true);
    try {
      await cartRepository.remove(productId);
      refresh();
    } finally {
      setIsSaving(false);
    }
  };

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  );

  return { items, total, update, remove, isSaving };
}