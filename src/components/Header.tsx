"use client";

import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/CartProvider";

type HeaderProps = {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;
};

export function Header({
  searchValue = "",
  onSearchChange,
  showSearch = false,
}: HeaderProps) {
  const { itemCount, isReady } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 sm:py-0 sm:h-16 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="shrink-0 text-xl font-bold tracking-tight text-foreground"
          >
            Gear<span className="text-accent">Hub</span>
          </Link>

          <Link
            href="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-zinc-50 sm:hidden"
            aria-label="Open cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {isReady && itemCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-accent-foreground">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            ) : null}
          </Link>
        </div>

        {showSearch ? (
          <div className="relative w-full flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={searchValue}
              onChange={(event) => onSearchChange?.(event.target.value)}
              placeholder="Search products or brands..."
              className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-ring"
              aria-label="Search products"
            />
          </div>
        ) : (
          <div className="hidden flex-1 sm:block" />
        )}

        <Link
          href="/cart"
          className="relative hidden h-10 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-zinc-50 sm:inline-flex"
          aria-label="Open cart"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Cart</span>
          {isReady && itemCount > 0 ? (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[11px] font-semibold text-accent-foreground">
              {itemCount > 99 ? "99+" : itemCount}
            </span>
          ) : null}
        </Link>
      </div>
    </header>
  );
}
