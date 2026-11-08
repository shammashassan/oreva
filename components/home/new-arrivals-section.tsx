"use client";

import * as React from "react";
import Link from "next/link";
import { Product } from "@/lib/schemas/product";
import { ProductCard } from "@/components/shared/product-card";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewArrivalsSectionProps {
  products: Product[];
}

export function NewArrivalsSection({ products }: NewArrivalsSectionProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const scrollAmount = clientWidth * 0.75;
    scrollContainerRef.current.scrollTo({
      left:
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 sm:py-24 bg-background border-t border-border/30">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C7A66B] font-medium block mb-2">
              LATEST CREATIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-light tracking-wide">
              New Arrivals
            </h2>
            <p className="font-serif italic text-sm text-muted-foreground mt-1">
              Discover our newest additions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => scroll("left")}
              aria-label="Previous products"
              className="rounded-md"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => scroll("right")}
              aria-label="Next products"
              className="rounded-md"
            >
              <ChevronRight className="size-4" />
            </Button>
            <Link
              href="/shop?filter=new"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-primary hover:text-primary/80 transition-colors ml-2 font-medium"
            >
              <span>View All</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* Scrollable Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
        >
          {products.map((product) => (
            <div
              key={product._id || product.slug}
              className="w-[260px] sm:w-[280px] shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
