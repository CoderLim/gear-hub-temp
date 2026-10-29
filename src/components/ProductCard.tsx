import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice } from "@/data/products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-zinc-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          {product.brand}
        </p>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground sm:text-base">
          {product.name}
        </h3>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-foreground sm:text-lg">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice ? (
              <span className="text-xs text-muted line-through">
                {formatPrice(product.originalPrice)}
              </span>
            ) : null}
          </div>
          <span className="text-xs text-muted sm:text-sm">
            ★ {product.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
