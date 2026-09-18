import { useMemo, useState } from "react";
import { useDependencies } from "@/app/DependenciesProvider";

export function useCartViewModel() {
  const { cartRepository } = useDependencies();
  const [items, setItems] = useState(() => cartRepository.getItems());

  const refresh = () => setItems(cartRepository.getItems());
  const update = (productId: number, quantity: number) => {
    cartRepository.update(productId, quantity);
    refresh();
  };
  const remove = (productId: number) => {
    cartRepository.remove(productId);
    refresh();
  };
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  );

  return { items, total, update, remove };
}
