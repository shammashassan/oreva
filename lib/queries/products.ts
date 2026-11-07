import { cacheTag, cacheLife } from "next/cache";
import { ObjectId } from "mongodb";
import { getCollection, COLLECTIONS } from "@/lib/db/client";
import { Product } from "@/lib/schemas/product";
import { INITIAL_PRODUCTS } from "@/lib/data";
import { ensureDatabaseSeeded } from "@/lib/db/seed";

interface GetProductsOptions {
  categoryId?: string;
  collectionId?: string;
  gender?: "women" | "men" | "unisex";
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  limit?: number;
  sort?: "price-asc" | "price-desc" | "newest" | "featured";
}

/**
 * Cached catalogue product query using Next.js modern caching.
 */
export async function getProducts(options: GetProductsOptions = {}): Promise<Product[]> {
  "use cache";
  cacheTag("products");
  cacheLife("hours");

  try {
    await ensureDatabaseSeeded();
    const col = await getCollection<Product>(COLLECTIONS.PRODUCTS);
    const filter: Record<string, unknown> = { isActive: true };

    if (options.categoryId) {
      const catCol = await getCollection(COLLECTIONS.CATEGORIES);
      const catSlug = options.categoryId.replace(/^cat_/, "").replace(/_/g, "-");
      const catDoc = await catCol.findOne({
        $or: [
          { slug: options.categoryId },
          { slug: catSlug },
          ...(ObjectId.isValid(options.categoryId)
            ? [{ _id: new ObjectId(options.categoryId) }]
            : []),
        ],
      });

      const matchedIds: string[] = [options.categoryId];
      if (catDoc) {
        matchedIds.push(
          catDoc._id.toString(),
          catDoc.slug,
          `cat_${catDoc.slug}`,
          `cat_${catDoc.slug.replace(/-/g, "_")}`
        );
      }
      matchedIds.push(
        `cat_${options.categoryId}`,
        `cat_${options.categoryId.replace(/-/g, "_")}`
      );
      filter.categoryId = { $in: Array.from(new Set(matchedIds)) };
    }

    if (options.collectionId) {
      const colCol = await getCollection(COLLECTIONS.COLLECTIONS);
      const colSlug = options.collectionId.replace(/^col_/, "").replace(/_/g, "-");
      const colDoc = await colCol.findOne({
        $or: [
          { slug: options.collectionId },
          { slug: colSlug },
          ...(ObjectId.isValid(options.collectionId)
            ? [{ _id: new ObjectId(options.collectionId) }]
            : []),
        ],
      });

      const matchedColIds: string[] = [options.collectionId];
      if (colDoc) {
        matchedColIds.push(
          colDoc._id.toString(),
          colDoc.slug,
          `col_${colDoc.slug}`,
          `col_${colDoc.slug.replace(/-/g, "_")}`
        );
      }
      matchedColIds.push(
        `col_${options.collectionId}`,
        `col_${options.collectionId.replace(/-/g, "_")}`
      );
      filter.collectionIds = { $in: Array.from(new Set(matchedColIds)) };
    }
    if (options.gender) {
      filter.gender = { $in: [options.gender, "unisex"] };
    }
    if (options.isFeatured !== undefined) {
      filter.isFeatured = options.isFeatured;
    }
    if (options.isBestseller !== undefined) {
      filter.isBestseller = options.isBestseller;
    }
    if (options.isNewArrival !== undefined) {
      filter.isNewArrival = options.isNewArrival;
    }

    let sortQuery: Record<string, 1 | -1> = { sortOrder: 1, createdAt: -1 };
    if (options.sort === "price-asc") {
      sortQuery = { price: 1 };
    } else if (options.sort === "price-desc") {
      sortQuery = { price: -1 };
    } else if (options.sort === "newest") {
      sortQuery = { createdAt: -1 };
    }

    let cursor = col
      .find(filter)
      .sort(sortQuery);

    if (options.limit) {
      cursor = cursor.limit(options.limit);
    }

    const docs = await cursor.toArray();
    return JSON.parse(JSON.stringify(docs));
  } catch (err: unknown) {
    console.warn("MongoDB query fallback to seed data:", err);
  }

  // Fallback to initial domain seed data ONLY if database connection fails
  let fallback = INITIAL_PRODUCTS.filter((p) => p.isActive);
  if (options.categoryId) {
    const target = options.categoryId.toLowerCase().replace(/^cat_/, "").replace(/_/g, "-");
    fallback = fallback.filter((p) => {
      const pCat = p.categoryId.toLowerCase().replace(/^cat_/, "").replace(/_/g, "-");
      return pCat === target || p.categoryId === options.categoryId;
    });
  }
  if (options.collectionId) {
    const target = options.collectionId.toLowerCase().replace(/^col_/, "").replace(/_/g, "-");
    fallback = fallback.filter((p) =>
      p.collectionIds.some((cId) => {
        const pCol = cId.toLowerCase().replace(/^col_/, "").replace(/_/g, "-");
        return pCol === target || cId === options.collectionId;
      })
    );
  }
  if (options.gender) {
    fallback = fallback.filter(
      (p) => p.gender === options.gender || p.gender === "unisex"
    );
  }
  if (options.isFeatured !== undefined) {
    fallback = fallback.filter((p) => p.isFeatured === options.isFeatured);
  }
  if (options.isBestseller !== undefined) {
    fallback = fallback.filter((p) => p.isBestseller === options.isBestseller);
  }
  if (options.isNewArrival !== undefined) {
    fallback = fallback.filter((p) => p.isNewArrival === options.isNewArrival);
  }

  if (options.sort === "price-asc") {
    fallback.sort((a, b) => a.price - b.price);
  } else if (options.sort === "price-desc") {
    fallback.sort((a, b) => b.price - a.price);
  } else if (options.sort === "newest") {
    fallback.sort((a, b) => (b.sortOrder ?? 0) - (a.sortOrder ?? 0));
  } else {
    fallback.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  }

  if (options.limit) {
    fallback = fallback.slice(0, options.limit);
  }

  return fallback;
}

/**
 * Cached single product query by slug with entity-specific tag.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  "use cache";
  cacheTag("products");
  cacheTag(`product-${slug}`);
  cacheLife("days");

  try {
    await ensureDatabaseSeeded();
    const col = await getCollection<Product>(COLLECTIONS.PRODUCTS);
    const doc = await col.findOne({ slug, isActive: true });
    if (doc) {
      return JSON.parse(JSON.stringify(doc));
    }
    return null;
  } catch (err: unknown) {
    console.warn(`Product lookup fallback for ${slug}:`, err);
  }

  const fallback = INITIAL_PRODUCTS.find((p) => p.slug === slug);
  return fallback ?? null;
}
