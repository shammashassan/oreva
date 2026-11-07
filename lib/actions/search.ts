"use server";

import { getCollection, COLLECTIONS } from "@/lib/db/client";
import { Product } from "@/lib/schemas/product";
import { INITIAL_PRODUCTS } from "@/lib/data";

/**
 * Server Action: Free-text product search callable by client components.
 * NEVER CACHED per Rule 4 to prevent memory bloat.
 */
export async function searchProductsAction(query: string): Promise<Product[]> {
  const clean = query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (!clean) return [];

  try {
    const col = await getCollection<Product>(COLLECTIONS.PRODUCTS);
    const regex = new RegExp(clean, "i");
    const docs = await col
      .find({
        isActive: true,
        $or: [{ name: regex }, { sku: regex }, { description: regex }],
      })
      .limit(10)
      .toArray();

    return JSON.parse(JSON.stringify(docs));
  } catch (err: unknown) {
    console.warn("Search fallback for query:", clean, err);
  }

  const regex = new RegExp(clean, "i");
  return INITIAL_PRODUCTS.filter(
    (p) =>
      p.isActive &&
      (regex.test(p.name) || regex.test(p.sku) || regex.test(p.description))
  ).slice(0, 10);
}
