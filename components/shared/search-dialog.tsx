"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Loader2, ArrowRight, Sparkles } from "lucide-react";
import { Product } from "@/lib/schemas/product";
import { searchProductsAction } from "@/lib/actions/search";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/shared/responsive-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  "Necklaces",
  "Rings",
  "Baroque Pearl",
  "Signet",
  "Gold Cuff",
  "Earrings",
];

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<Product[]>([]);
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    if (!query.trim()) {
      return;
    }

    const timer = setTimeout(() => {
      startTransition(async () => {
        try {
          const res = await searchProductsAction(query);
          setResults(res);
        } catch (err: unknown) {
          console.warn("Search failed:", err);
        }
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const activeResults = query.trim() ? results : [];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl p-0 gap-0 overflow-hidden bg-background border border-border">
        <DialogHeader className="p-4 border-b border-border">
          <DialogTitle className="font-serif text-lg tracking-wide text-foreground">
            Search Catalogue
          </DialogTitle>
          <div className="relative mt-2 flex items-center">
            <Search className="absolute left-3 size-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search necklaces, solitaire rings, emeralds..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 pr-9 h-11 text-sm bg-muted/30 border-border"
              autoFocus
            />
            {isPending && (
              <Loader2 className="absolute right-3 size-4 animate-spin text-primary" />
            )}
            {query && !isPending && (
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setQuery("")}
                className="absolute right-2 text-muted-foreground hover:text-foreground"
              >
                ✕
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="max-h-[380px] overflow-y-auto p-4">
          {query.trim() === "" ? (
            <div className="py-6 flex flex-col items-center text-center gap-3">
              <p className="font-serif text-xs text-muted-foreground uppercase tracking-widest">
                Curated Suggestions
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {POPULAR_SEARCHES.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10 hover:border-primary/40 transition-colors py-1 px-3 text-xs"
                    onClick={() => setQuery(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ) : activeResults.length === 0 && !isPending ? (
            <Empty className="py-8">
              <EmptyMedia variant="icon">
                <Sparkles className="size-4 text-primary" />
              </EmptyMedia>
              <EmptyHeader>
                <EmptyTitle>No Pieces Found</EmptyTitle>
                <EmptyDescription>
                  We couldn&apos;t find any jewellery matching &ldquo;{query}&rdquo;. Try another material, stone, or keyword.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <div className="flex flex-col divide-y divide-border/40">
              {activeResults.map((product) => (
                <Link
                  key={product._id || product.slug}
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 py-3 group hover:bg-muted/40 px-3 rounded-lg transition-colors"
                >
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-muted border border-border">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm text-foreground group-hover:text-primary transition-colors truncate">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-muted-foreground">
                      {product.sku} • £{product.price.toLocaleString()}
                    </p>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
