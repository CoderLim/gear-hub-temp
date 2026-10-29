"use client";

import { useState } from "react";
import { AddToCartButton } from "@/components/AddToCartButton";
import { QuantitySelector } from "@/components/QuantitySelector";

type ProductPurchasePanelProps = {
  productId: string;
  sticky?: boolean;
};

export function ProductPurchasePanel({
  productId,
  sticky = false,
}: ProductPurchasePanelProps) {
  const [quantity, setQuantity] = useState(1);

  const content = (
    <div className="flex items-center gap-3">
      <QuantitySelector value={quantity} onChange={setQuantity} />
      <div className="flex-1">
        <AddToCartButton productId={productId} quantity={quantity} />
      </div>
    </div>
  );

  if (!sticky) {
    return <div className="mt-6 hidden md:block">{content}</div>;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden">
      {content}
    </div>
  );
}
