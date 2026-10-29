"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { CartItemRow } from "@/components/CartItem";
import { Header } from "@/components/Header";
import { useCart } from "@/components/CartProvider";
import { formatPrice, getProductById } from "@/data/products";

export function CartView() {
  const { items, isReady } = useCart();

  const lines = items
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) return null;
      return { product, quantity: item.quantity };
    })
    .filter((line): line is NonNullable<typeof line> => line !== null);

  const subtotal = lines.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  );

  function handleCheckout() {
    window.alert(
      "This is a demo storefront. Checkout and real payments are not available.",
    );
  }

  return (
    <div className="flex min-h-full flex-col">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Shopping Cart
        </h1>

        {!isReady ? (
          <div className="mt-8 rounded-2xl border border-border bg-card px-6 py-16 text-center text-sm text-muted">
            Loading cart...
          </div>
        ) : lines.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
            <ShoppingBag className="mx-auto h-10 w-10 text-muted" />
            <p className="mt-4 text-lg font-semibold text-foreground">
              Your cart is empty
            </p>
            <p className="mt-2 text-sm text-muted">
              Browse GearHub and add a few tech essentials.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-accent px-5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div className="space-y-3 pb-28 lg:pb-0">
              {lines.map(({ product, quantity }) => (
                <CartItemRow
                  key={product.id}
                  product={product}
                  quantity={quantity}
                />
              ))}
            </div>

            <aside className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur lg:static lg:rounded-2xl lg:border lg:p-5 lg:shadow-none">
              <h2 className="text-base font-semibold text-foreground">
                Order Summary
              </h2>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="font-semibold tabular-nums text-foreground">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted">
                Shipping and taxes calculated at checkout (demo only).
              </p>
              <button
                type="button"
                onClick={handleCheckout}
                className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-xl bg-accent text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
              >
                Checkout
              </button>
              <Link
                href="/"
                className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-xl border border-border text-sm font-medium text-foreground transition-colors hover:bg-zinc-50"
              >
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
