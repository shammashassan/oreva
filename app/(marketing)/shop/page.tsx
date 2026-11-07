import { Suspense } from "react";
import { Metadata } from "next";
import { getProducts } from "@/lib/queries/products";
import { getCategories } from "@/lib/queries/categories";
import { ShopCatalog } from "@/components/shop/shop-catalog";

export const metadata: Metadata = {
  title: "Shop All Fine Jewellery | ORÉVA",
  description:
    "Explore the complete ORÉVA catalogue: necklaces, rings, earrings, bracelets, and handcrafted enamel bangles.",
};

function ShopGridSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-10 w-full bg-muted/60 rounded-xs" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="flex flex-col bg-card rounded-xs overflow-hidden border border-border/40"
          >
            <div className="aspect-[4/5] w-full bg-muted/60" />
            <div className="p-4 space-y-2">
              <div className="h-3 w-16 bg-muted/70 rounded-xs" />
              <div className="h-4 w-3/4 bg-muted/80 rounded-xs" />
              <div className="h-4 w-20 bg-muted/70 rounded-xs pt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function ShopContent() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return <ShopCatalog initialProducts={products} categories={categories} />;
}

export default function ShopPage() {
  return (
    <div className="py-12 sm:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Instant Static Header Shell */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#C7A66B] font-medium block">
            THE CATALOGUE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-foreground font-light tracking-wide">
            Fine Jewellery Collection
          </h1>
          <p className="font-serif italic text-sm text-muted-foreground">
            Handcrafted with uncompromising devotion to silhouette, symmetry, and stone excellence.
          </p>
        </div>

        {/* Catalog and Filters */}
        <Suspense fallback={<ShopGridSkeleton />}>
          <ShopContent />
        </Suspense>
      </div>
    </div>
  );
}
