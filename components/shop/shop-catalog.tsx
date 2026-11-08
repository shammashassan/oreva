"use client";

import * as React from "react";
import { useQueryState } from "nuqs";
import { Product } from "@/lib/schemas/product";
import { Category } from "@/lib/schemas/category";
import { ProductCard } from "@/components/shared/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import { cn } from "cn";
import { Search, X, SlidersHorizontal, Sparkles } from "lucide-react";

interface ShopCatalogProps {
  initialProducts: Product[];
  categories: Category[];
}

export function ShopCatalog({ initialProducts, categories }: ShopCatalogProps) {
  const [category, setCategory] = useQueryState("category");
  const [gender, setGender] = useQueryState("gender");
  const [sort, setSort] = useQueryState("sort");
  const [filter, setFilter] = useQueryState("filter");
  const [search, setSearch] = useQueryState("q");

  // Filter & sort pieces client-side for instant 0ms feedback
  const filteredProducts = React.useMemo(() => {
    let result = [...initialProducts];

    // Filter by Category
    if (category) {
      const target = category.toLowerCase();
      const matchedCat = categories.find(
        (c) =>
          c.slug.toLowerCase() === target ||
          c._id === category ||
          c.name.toLowerCase() === target
      );

      const validCatIds = new Set<string>();
      validCatIds.add(category);
      validCatIds.add(target);
      if (matchedCat) {
        if (matchedCat._id) validCatIds.add(matchedCat._id);
        if (matchedCat.slug) {
          validCatIds.add(matchedCat.slug);
          validCatIds.add(`cat_${matchedCat.slug}`);
          validCatIds.add(`cat_${matchedCat.slug}`.replace(/-/g, "_"));
        }
      }
      validCatIds.add(`cat_${target}`);
      validCatIds.add(`cat_${target}`.replace(/-/g, "_"));

      result = result.filter((p) => p.categoryId && validCatIds.has(p.categoryId));
    }

    // Filter by Gender
    if (gender && (gender === "women" || gender === "men")) {
      result = result.filter(
        (p) => p.gender === gender || p.gender === "unisex"
      );
    }

    // Filter by Special Flag (new arrivals / bestsellers)
    if (filter === "new") {
      result = result.filter((p) => p.isNewArrival);
    } else if (filter === "bestsellers") {
      result = result.filter((p) => p.isBestseller);
    }

    // Filter by Search Query
    if (search && search.trim() !== "") {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
      );
    } else {
      // Default / Featured sort
      result.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    }

    return result;
  }, [initialProducts, categories, category, gender, sort, filter, search]);

  const hasActiveFilters = Boolean(
    category || gender || sort || filter || (search && search.trim() !== "")
  );

  const clearAllFilters = () => {
    setCategory(null);
    setGender(null);
    setSort(null);
    setFilter(null);
    setSearch(null);
  };

  return (
    <div className="space-y-8">
      {/* Search and Quick Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-border/40">
        <div className="relative flex-1 max-w-sm">
          <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            type="search"
            placeholder="Search piece name, gemstone, silhouette..."
            value={search ?? ""}
            onChange={(e) => setSearch(e.target.value ? e.target.value : null)}
            className="pl-9 pr-8 text-xs bg-card"
          />
          {search && (
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => setSearch(null)}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <X className="size-3" />
            </Button>
          )}
        </div>

        {/* Quick Filter Badges (New Arrivals & Bestsellers) */}
        <div className="flex items-center gap-2">
          <Button
            variant={filter === "new" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(filter === "new" ? null : "new")}
            className="text-xs uppercase tracking-wider"
          >
            <Sparkles data-icon="inline-start" className="size-3 mr-1" />
            New Arrivals
          </Button>
          <Button
            variant={filter === "bestsellers" ? "default" : "outline"}
            size="sm"
            onClick={() =>
              setFilter(filter === "bestsellers" ? null : "bestsellers")
            }
            className="text-xs uppercase tracking-wider"
          >
            Bestsellers
          </Button>
        </div>
      </div>

      {/* Main Filter Bar */}
      <div className="py-2 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={!category ? "default" : "secondary"}
            size="sm"
            onClick={() => setCategory(null)}
            className="text-xs uppercase tracking-wider cursor-pointer"
          >
            All Pieces
          </Button>
          {categories.map((c) => (
            <Button
              key={c.slug}
              variant={category === c.slug ? "default" : "secondary"}
              size="sm"
              onClick={() => setCategory(c.slug === category ? null : c.slug)}
              className="text-xs uppercase tracking-wider cursor-pointer"
            >
              {c.name}
            </Button>
          ))}
        </div>

        {/* Gender ToggleGroup & Sort Select using official Shadcn primitives */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
          {/* Gender ToggleGroup */}
          <ToggleGroup
            value={[gender ?? "all"]}
            onValueChange={(val) => {
              const selected = val[0];
              if (selected === "women" || selected === "men") {
                setGender(selected);
              } else {
                setGender(null);
              }
            }}
            size="sm"
            variant="outline"
          >
            <ToggleGroupItem value="all" className="text-[11px] tracking-wider uppercase px-2.5">
              All
            </ToggleGroupItem>
            <ToggleGroupItem value="women" className="text-[11px] tracking-wider uppercase px-2.5">
              Women
            </ToggleGroupItem>
            <ToggleGroupItem value="men" className="text-[11px] tracking-wider uppercase px-2.5">
              Men
            </ToggleGroupItem>
          </ToggleGroup>

          {/* Sort Select */}
          <Select
            value={sort ?? "featured"}
            onValueChange={(val) =>
              setSort(val === "featured" || !val ? null : (val as "price-asc" | "price-desc" | "newest"))
            }
          >
            <SelectTrigger className="w-44 text-xs bg-card">
              <SelectValue placeholder="Featured Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured Order</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active filters status & count bar */}
      <div className="flex items-center justify-between text-xs py-2 border-y border-border/40">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-3.5 text-muted-foreground" />
          <span className="uppercase tracking-widest text-muted-foreground text-[11px] font-medium">
            Showing {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "Piece" : "Pieces"}
          </span>

          {hasActiveFilters && (
            <Badge variant="outline" className="text-[10px] uppercase ml-2">
              Filters Active
            </Badge>
          )}
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs text-muted-foreground hover:text-foreground h-7 px-2"
          >
            <X className="size-3 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Products Grid or Official Shadcn Empty State */}
      {filteredProducts.length === 0 ? (
        <Empty className="py-20 border border-dashed border-border/60 bg-muted/10 rounded-xs">
          <EmptyHeader>
            <EmptyTitle className="font-serif text-2xl font-light text-foreground">
              No jewellery pieces match your current selection
            </EmptyTitle>
            <EmptyDescription className="text-xs text-muted-foreground max-w-md mx-auto">
              Try adjusting your search criteria, switching categories, or clearing
              applied filters to view the full collection.
            </EmptyDescription>
          </EmptyHeader>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="mt-2 text-xs uppercase tracking-wider"
            >
              Reset All Filters
            </Button>
          )}
        </Empty>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 2xl:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id || product.slug}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}
