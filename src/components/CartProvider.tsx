"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

const STORAGE_KEY = "gearhub-cart";

export type CartItem = {
  productId: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "HYDRATE"; items: CartItem[] }
  | { type: "ADD"; productId: string; quantity: number }
  | { type: "SET_QUANTITY"; productId: string; quantity: number }
  | { type: "REMOVE"; productId: string }
  | { type: "CLEAR" };

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  isReady: boolean;
  addItem: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getQuantity: (productId: string) => number;
};

const CartContext = createContext<CartContextValue | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items };
    case "ADD": {
      const existing = state.items.find(
        (item) => item.productId === action.productId,
      );
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.productId === action.productId
              ? { ...item, quantity: item.quantity + action.quantity }
              : item,
          ),
        };
      }
      return {
        items: [
          ...state.items,
          { productId: action.productId, quantity: action.quantity },
        ],
      };
    }
    case "SET_QUANTITY": {
      if (action.quantity < 1) {
        return {
          items: state.items.filter(
            (item) => item.productId !== action.productId,
          ),
        };
      }
      return {
        items: state.items.map((item) =>
          item.productId === action.productId
            ? { ...item, quantity: action.quantity }
            : item,
        ),
      };
    }
    case "REMOVE":
      return {
        items: state.items.filter(
          (item) => item.productId !== action.productId,
        ),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

function readStoredCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (item): item is CartItem =>
          typeof item === "object" &&
          item !== null &&
          typeof (item as CartItem).productId === "string" &&
          typeof (item as CartItem).quantity === "number" &&
          (item as CartItem).quantity > 0,
      )
      .map((item) => ({
        productId: item.productId,
        quantity: Math.floor(item.quantity),
      }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    dispatch({ type: "HYDRATE", items: readStoredCart() });
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items, isReady]);

  const addItem = useCallback((productId: string, quantity = 1) => {
    dispatch({
      type: "ADD",
      productId,
      quantity: Math.max(1, Math.floor(quantity)),
    });
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: "SET_QUANTITY", productId, quantity });
  }, []);

  const removeItem = useCallback((productId: string) => {
    dispatch({ type: "REMOVE", productId });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const getQuantity = useCallback(
    (productId: string) =>
      state.items.find((item) => item.productId === productId)?.quantity ?? 0,
    [state.items],
  );

  const itemCount = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items],
  );

  const value = useMemo(
    () => ({
      items: state.items,
      itemCount,
      isReady,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
      getQuantity,
    }),
    [
      state.items,
      itemCount,
      isReady,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
      getQuantity,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
