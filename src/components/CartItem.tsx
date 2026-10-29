"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { QuantitySelector } from "@/components/QuantitySelector";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/data/products";
import type { Product } from "@/types/product";

type CartItemProps = {
  product: Product;
  quantity: number;
};

export function CartItemRow({ product, quantity }: CartItemProps) {
  const { setQuantity, removeItem } = useCart();
  const lineTotal = product.price * quantity;

  return (
    <article className="flex gap-4 rounded-2xl border border-border bg-card p-3 sm:p-4">
      <Link
        href={`/products/${product.id}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-zinc-100 sm:h-28 sm:w-28"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="112px"
          className="object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              {product.brand}
            </p>
            <Link
              href={`/products/${product.id}`}
              className="mt-0.5 line-clamp-2 text-sm font-semibold text-foreground hover:text-accent sm:text-base"
            >
              {product.name}
            </Link>
            <p className="mt-1 text-sm font-medium text-foreground">
              {formatPrice(product.price)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => removeItem(product.id)}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-zinc-50 hover:text-foreground"
            aria-label={`Remove ${product.name}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <QuantitySelector
            value={quantity}
            onChange={(value) => setQuantity(product.id, value)}
          />
          <p className="text-sm font-bold tabular-nums text-foreground sm:text-base">
            {formatPrice(lineTotal)}
          </p>
        </div>
      </div>
    </article>
  );
}
