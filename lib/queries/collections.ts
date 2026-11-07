import { cacheTag, cacheLife } from "next/cache";
import { getCollection, COLLECTIONS } from "@/lib/db/client";
import { Collection } from "@/lib/schemas/collection";
import { INITIAL_COLLECTIONS } from "@/lib/data";
import { ensureDatabaseSeeded } from "@/lib/db/seed";

export async function getCollections(): Promise<Collection[]> {
  "use cache";
  cacheTag("collections");
  cacheLife("days");

  try {
    await ensureDatabaseSeeded();
    const col = await getCollection<Collection>(COLLECTIONS.COLLECTIONS);
    const docs = await col
      .find({ isActive: true })
      .sort({ sortOrder: 1 })
      .toArray();

    return JSON.parse(JSON.stringify(docs));
  } catch (err: unknown) {
    console.warn("Collections query fallback:", err);
  }

  return INITIAL_COLLECTIONS.filter((c) => c.isActive);
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  "use cache";
  cacheTag("collections");
  cacheTag(`collection-${slug}`);
  cacheLife("days");

  try {
    await ensureDatabaseSeeded();
    const col = await getCollection<Collection>(COLLECTIONS.COLLECTIONS);
    const doc = await col.findOne({ slug, isActive: true });
    if (doc) {
      return JSON.parse(JSON.stringify(doc));
    }
    return null;
  } catch (err: unknown) {
    console.warn(`Collection lookup fallback for ${slug}:`, err);
  }

  const fallback = INITIAL_COLLECTIONS.find((c) => c.slug === slug);
  return fallback ?? null;
}
