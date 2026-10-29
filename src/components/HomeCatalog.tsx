"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { ProductFilters, type SortOption } from "@/components/ProductFilters";
import { ProductGrid } from "@/components/ProductGrid";
import { products } from "@/data/products";
import type { CategoryFilter } from "@/types/product";

export function HomeCatalog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [sort, setSort] = useState<SortOption>("featured");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    let next = products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });

    if (sort === "price-asc") {
      next = [...next].sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      next = [...next].sort((a, b) => b.price - a.price);
    }

    return next;
  }, [search, category, sort]);

  const hasActiveFilters = search.trim() !== "" || category !== "All";

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setSort("featured");
  }

  return (
    <div className="flex min-h-full flex-col">
      <Header
        showSearch
        searchValue={search}
        onSearchChange={setSearch}
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Shop Tech Accessories
          </h1>
          <p className="mt-1 text-sm text-muted sm:text-base">
            Headphones, keyboards, mice, speakers, and everyday essentials.
          </p>
        </div>

        <div className="mb-6">
          <ProductFilters
            category={category}
            sort={sort}
            onCategoryChange={setCategory}
            onSortChange={setSort}
          />
        </div>

        <div className="mb-4 text-sm text-muted">
          Showing {filteredProducts.length} of {products.length} products
        </div>

        <ProductGrid
          products={filteredProducts}
          emptyAction={
            hasActiveFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 inline-flex h-10 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
              >
                Clear filters
              </button>
            ) : null
          }
        />
      </main>

      <footer className="border-t border-border bg-card py-6 text-center text-sm text-muted">
        © 2026 GearHub. Demo storefront.
      </footer>
    </div>
  );
}
