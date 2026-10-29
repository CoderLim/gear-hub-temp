import type { ReactNode } from "react";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";

type ProductGridProps = {
  products: Product[];
  emptyAction?: ReactNode;
};

export function ProductGrid({ products, emptyAction }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
        <p className="text-lg font-semibold text-foreground">No products found</p>
        <p className="mt-2 text-sm text-muted">
          Try adjusting your search or category filters.
        </p>
        {emptyAction}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
