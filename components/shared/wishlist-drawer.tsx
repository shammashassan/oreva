"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import { useWishlist } from "./wishlist-context";
import { WhatsAppButton } from "./whatsapp-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

export function WishlistDrawer() {
  const { items, isOpen, setIsOpen, removeItem } = useWishlist();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col justify-between">
        <SheetHeader className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Heart className="size-4 text-primary fill-primary" />
            <SheetTitle className="font-serif text-xl tracking-wider text-foreground">
              Saved Pieces ({items.length})
            </SheetTitle>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <Empty className="border-none">
              <EmptyMedia variant="icon">
                <Heart className="size-5 text-muted-foreground" />
              </EmptyMedia>
              <EmptyHeader>
                <EmptyTitle className="font-serif text-lg font-light text-foreground">
                  Your wishlist is empty
                </EmptyTitle>
                <EmptyDescription className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                  Explore our jewellery collections and click the heart icon on any
                  piece to curate your personal collection.
                </EmptyDescription>
              </EmptyHeader>
              <Button
                variant="default"
                size="sm"
                nativeButton={false}
                onClick={() => setIsOpen(false)}
                render={<Link href="/shop" />}
                className="mt-4 text-xs uppercase tracking-widest"
              >
                Explore Catalogue
              </Button>
            </Empty>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.map((product) => {
              const id = product._id || product.slug;
              return (
                <div
                  key={id}
                  className="flex gap-4 p-3 rounded-xs border border-border bg-card/50 hover:bg-card transition-colors group"
                >
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-xs bg-muted">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${product.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="font-serif text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-1"
                        >
                          {product.name}
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => removeItem(id)}
                          className="text-muted-foreground hover:text-destructive"
                          title="Remove from saved"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        {product.sku}
                      </p>
                      <p className="text-xs font-semibold text-primary mt-1">
                        £{product.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="pt-2">
                      <WhatsAppButton
                        productId={id}
                        productName={product.name}
                        productSku={product.sku}
                        productPrice={product.price}
                        variant="outline"
                        label="Enquire"
                        className="py-1 px-3 text-[10px] w-full"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {items.length > 0 && (
          <div className="p-6 border-t border-border bg-muted/30 flex flex-col gap-3">
            <Link
              href="/shop"
              onClick={() => setIsOpen(false)}
              className="text-center text-xs text-muted-foreground hover:text-primary uppercase tracking-widest"
            >
              Continue Browsing
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
