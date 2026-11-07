"use client";

import * as React from "react";
import { Product } from "@/lib/schemas/product";

interface WishlistContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  toggleItem: (product: Product) => void;
  count: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const WishlistContext = React.createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<Product[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("oreva_wishlist");
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(JSON.parse(stored));
      }
    } catch (e: unknown) {
      console.warn("Could not load wishlist from localStorage:", e);
    } finally {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoaded(true);
    }
  }, []);

  React.useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("oreva_wishlist", JSON.stringify(items));
    } catch (e: unknown) {
      console.warn("Could not persist wishlist:", e);
    }
  }, [items, isLoaded]);

  const addItem = React.useCallback((product: Product) => {
    setItems((prev) => {
      const id = product._id || product.slug;
      if (prev.some((p) => (p._id || p.slug) === id)) return prev;
      return [...prev, product];
    });
  }, []);

  const removeItem = React.useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => (p._id || p.slug) !== id));
  }, []);

  const isInWishlist = React.useCallback(
    (id: string) => items.some((p) => (p._id || p.slug) === id),
    [items]
  );

  const toggleItem = React.useCallback(
    (product: Product) => {
      const id = product._id || product.slug;
      if (isInWishlist(id)) {
        removeItem(id);
      } else {
        addItem(product);
      }
    },
    [isInWishlist, addItem, removeItem]
  );

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
        toggleItem,
        count: items.length,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = React.useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
}
