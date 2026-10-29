import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { ProductPurchasePanel } from "@/components/ProductPurchasePanel";
import { ProductCard } from "@/components/ProductCard";
import {
  formatPrice,
  getProductById,
  products,
} from "@/data/products";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) {
    return { title: "Product Not Found | GearHub" };
  }
  return {
    title: `${product.name} | GearHub`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const related = products
    .filter(
      (item) =>
        item.id !== product.id && item.category === product.category,
    )
    .slice(0, 4);

  return (
    <div className="flex min-h-full flex-col">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 pb-28 sm:px-6 sm:py-8 md:pb-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to products
        </Link>

        <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-zinc-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-muted">
              {product.brand}
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 text-sm font-medium text-foreground">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {product.rating.toFixed(1)}
              </div>
              <span className="text-sm text-muted">
                {product.reviewCount.toLocaleString("en-US")} reviews
              </span>
              <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-muted">
                {product.category}
              </span>
            </div>

            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice ? (
                <span className="text-base text-muted line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              ) : null}
            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
              {product.description}
            </p>

            <ul className="mt-6 space-y-2">
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-2 text-sm text-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {feature}
                </li>
              ))}
            </ul>

            <ProductPurchasePanel productId={product.id} />
          </div>
        </div>

        {related.length > 0 ? (
          <section className="mt-12 md:mt-16">
            <h2 className="text-xl font-bold text-foreground">
              Related products
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </main>

      <ProductPurchasePanel productId={product.id} sticky />
    </div>
  );
}
