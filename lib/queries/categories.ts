import { cacheTag, cacheLife } from "next/cache";
import { getCollection, COLLECTIONS } from "@/lib/db/client";
import { Category } from "@/lib/schemas/category";
import { INITIAL_CATEGORIES } from "@/lib/data";
import { ensureDatabaseSeeded } from "@/lib/db/seed";

export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheTag("categories");
  cacheLife("days");

  try {
    await ensureDatabaseSeeded();
    const col = await getCollection<Category>(COLLECTIONS.CATEGORIES);
    const docs = await col
      .find({ isActive: true })
      .sort({ sortOrder: 1 })
      .toArray();

    return JSON.parse(JSON.stringify(docs));
  } catch (err: unknown) {
    console.warn("Categories query fallback:", err);
  }

  return INITIAL_CATEGORIES.filter((c) => c.isActive);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  "use cache";
  cacheTag("categories");
  cacheTag(`category-${slug}`);
  cacheLife("days");

  try {
    await ensureDatabaseSeeded();
    const col = await getCollection<Category>(COLLECTIONS.CATEGORIES);
    const doc = await col.findOne({ slug, isActive: true });
    if (doc) {
      return JSON.parse(JSON.stringify(doc));
    }
    return null;
  } catch (err: unknown) {
    console.warn(`Category lookup fallback for ${slug}:`, err);
  }

  const fallback = INITIAL_CATEGORIES.find((c) => c.slug === slug);
  return fallback ?? null;
}
