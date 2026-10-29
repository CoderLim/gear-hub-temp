"use client";

import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/CartProvider";

type AddToCartButtonProps = {
  productId: string;
  quantity?: number;
  className?: string;
  label?: string;
};

export function AddToCartButton({
  productId,
  quantity = 1,
  className = "",
  label = "Add to Cart",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(productId, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover disabled:opacity-70 ${className}`}
    >
      {added ? (
        <>
          <Check className="h-4 w-4" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" />
          {label}
        </>
      )}
    </button>
  );
}
