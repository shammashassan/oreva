import { getDb, COLLECTIONS } from "./client";

export async function ensureIndexes(): Promise<void> {
  try {
    const db = await getDb();

    // 1. Products: ESR rule for listings & sorting
    await db.collection(COLLECTIONS.PRODUCTS).createIndexes([
      {
        key: { isActive: 1, categoryId: 1, sortOrder: 1, createdAt: -1 },
        name: "idx_products_listing",
      },
      {
        key: { slug: 1 },
        unique: true,
        name: "idx_products_slug_unique",
      },
      {
        key: { sku: 1 },
        unique: true,
        name: "idx_products_sku_unique",
      },
      {
        key: { isFeatured: 1, isActive: 1 },
        name: "idx_products_featured",
      },
      {
        key: { isBestseller: 1, isActive: 1 },
        name: "idx_products_bestseller",
      },
      {
        key: { isNewArrival: 1, isActive: 1 },
        name: "idx_products_new_arrival",
      },
    ]);

    // 2. Categories
    await db.collection(COLLECTIONS.CATEGORIES).createIndexes([
      {
        key: { slug: 1 },
        unique: true,
        name: "idx_categories_slug_unique",
      },
      {
        key: { isActive: 1, sortOrder: 1 },
        name: "idx_categories_order",
      },
    ]);

    // 3. Collections
    await db.collection(COLLECTIONS.COLLECTIONS).createIndexes([
      {
        key: { slug: 1 },
        unique: true,
        name: "idx_collections_slug_unique",
      },
      {
        key: { isActive: 1, sortOrder: 1 },
        name: "idx_collections_order",
      },
    ]);

    // 4. Enquiries (Analytics)
    await db.collection(COLLECTIONS.ENQUIRIES).createIndexes([
      {
        key: { clickedAt: -1, productId: 1 },
        name: "idx_enquiries_date_product",
      },
      {
        key: { productId: 1 },
        name: "idx_enquiries_product",
      },
    ]);
  } catch (err: unknown) {
    console.warn("Index creation skipped or deferred:", err);
  }
}
