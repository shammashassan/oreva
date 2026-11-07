"use client";

import * as React from "react";
import Link from "next/link";
import { Product } from "@/lib/schemas/product";
import { ProductCard } from "@/components/shared/product-card";
import { ArrowRight } from "lucide-react";

interface BestsellersSectionProps {
  products: Product[];
}

export function BestsellersSection({ products }: BestsellersSectionProps) {
  return (
    <section className="py-20 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C7A66B] font-medium block mb-2">
              SIGNATURE DESIGNS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-light tracking-wide">
              Our Bestsellers
            </h2>
            <p className="font-serif italic text-sm text-muted-foreground mt-1">
              Discover the pieces everyone loves.
            </p>
          </div>

          <Link
            href="/shop?filter=bestsellers"
            className="text-xs uppercase tracking-[0.2em] text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1.5 font-medium group"
          >
            <span>Explore All Bestsellers</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product._id || product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
