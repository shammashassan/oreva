"use client";

import * as React from "react";
import { useQueryState } from "nuqs";
import { Category } from "@/lib/schemas/category";
import { cn } from "cn";

interface ShopFilterBarProps {
  categories: Category[];
}

export function ShopFilterBar({ categories }: ShopFilterBarProps) {
  const [category, setCategory] = useQueryState("category");
  const [gender, setGender] = useQueryState("gender");
  const [sort, setSort] = useQueryState("sort");

  return (
    <div className="py-6 border-b border-border/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setCategory(null)}
          className={cn(
            "px-3.5 py-1.5 rounded-xs text-xs tracking-wider uppercase transition-colors cursor-pointer",
            !category
              ? "bg-[#491323] text-[#FFF9F1] font-medium"
              : "bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          All Pieces
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => setCategory(c.slug === category ? null : c.slug)}
            className={cn(
              "px-3.5 py-1.5 rounded-xs text-xs tracking-wider uppercase transition-colors cursor-pointer",
              category === c.slug
                ? "bg-[#491323] text-[#FFF9F1] font-medium"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Gender & Sort Controls */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
        {/* Gender toggles */}
        <div className="flex items-center rounded-xs border border-border p-0.5 bg-muted/40">
          {[
            { label: "All", val: null },
            { label: "Women", val: "women" },
            { label: "Men", val: "men" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setGender(item.val)}
              className={cn(
                "px-2.5 py-1 text-[11px] tracking-wider uppercase rounded-xs transition-colors cursor-pointer",
                gender === item.val || (!gender && item.val === null)
                  ? "bg-background text-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <select
          value={sort ?? "featured"}
          onChange={(e) => setSort(e.target.value === "featured" ? null : e.target.value)}
          className="bg-transparent border border-border rounded-xs px-2.5 py-1.5 text-xs text-foreground outline-none cursor-pointer"
        >
          <option value="featured">Featured Order</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest First</option>
        </select>
      </div>
    </div>
  );
}
