import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { Product } from "../types/product";

interface CartItem extends Product {
  quantity: number;
}

const MAX_QUANTITY = 99;

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  placeOrder: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  const addToCart = useCallback((item: Product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((i) => i.id === item.id);

      if (existingItem && existingItem.quantity >= MAX_QUANTITY) {
        throw new Error(`Maksymalna ilość produktu to ${MAX_QUANTITY} sztuk.`);
      }

      const newItems = existingItem
        ? currentItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...currentItems, { ...item, quantity: 1 } as CartItem];

      try {
        localStorage.setItem("cart", JSON.stringify(newItems));
      } catch (error) {
        console.error("Error saving cart to localStorage:", error);
      }

      return newItems;
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setItems((currentItems) => {
      const newItems = currentItems.filter((item) => item.id !== id);
      try {
        localStorage.setItem("cart", JSON.stringify(newItems));
      } catch (error) {
        console.error("Error saving cart to localStorage:", error);
      }
      return newItems;
    });
  }, []);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity < 1) return;
    if (quantity > MAX_QUANTITY) {
      throw new Error(`Maksymalna ilość produktu to ${MAX_QUANTITY} sztuk.`);
    }

    setItems((currentItems) => {
      const newItems = currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      try {
        localStorage.setItem("cart", JSON.stringify(newItems));
      } catch (error) {
        console.error("Error saving cart to localStorage:", error);
      }
      return newItems;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    try {
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Error clearing cart from localStorage:", error);
    }
  }, []);

  const placeOrder = useCallback(() => {
    try {
      localStorage.setItem("lastOrder", JSON.stringify(items));
      clearCart();
    } catch (error) {
      console.error("Error saving order to localStorage:", error);
      throw new Error(
        "Nie udało się złożyć zamówienia. Spróbuj ponownie później."
      );
    }
  }, [items, clearCart]);

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      placeOrder,
    }),
    [items, addToCart, removeFromCart, updateQuantity, clearCart, placeOrder]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
