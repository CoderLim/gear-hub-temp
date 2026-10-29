"use client";

import { CATEGORIES, type CategoryFilter } from "@/types/product";

export type SortOption = "featured" | "price-asc" | "price-desc";

type ProductFiltersProps = {
  category: CategoryFilter;
  sort: SortOption;
  onCategoryChange: (category: CategoryFilter) => void;
  onSortChange: (sort: SortOption) => void;
};

export function ProductFilters({
  category,
  sort,
  onCategoryChange,
  onSortChange,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        {CATEGORIES.map((item) => {
          const active = category === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => onCategoryChange(item)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-card text-foreground hover:bg-zinc-50"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <label className="flex items-center gap-2 text-sm text-muted">
        <span className="shrink-0">Sort</span>
        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value as SortOption)}
          className="h-10 rounded-xl border border-border bg-card px-3 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-ring"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </label>
    </div>
  );
}
