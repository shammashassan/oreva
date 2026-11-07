import { getCollection, COLLECTIONS } from "./client";
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_COLLECTIONS,
  DEFAULT_SETTINGS,
} from "@/lib/data";
import { INITIAL_HOMEPAGE_CMS } from "@/lib/schemas/homepage";

let isSeeding = false;
let isSeeded = false;

/**
 * Idempotently ensures the default luxury showcase catalogue, categories,
 * collections, settings, and CMS are populated in MongoDB.
 *
 * Uses $setOnInsert so existing documents and user customizations
 * are never overwritten or deleted.
 */
export async function ensureDatabaseSeeded(): Promise<void> {
  if (isSeeded || isSeeding) return;
  isSeeding = true;

  try {
    // 1. Seed Categories
    const catCol = await getCollection(COLLECTIONS.CATEGORIES);
    for (const cat of INITIAL_CATEGORIES) {
      const { _id, ...catData } = cat;
      await catCol.updateOne(
        { slug: cat.slug },
        {
          $setOnInsert: {
            ...catData,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      );
    }
    const allDbCats = await catCol.find().toArray();
    const catIdBySlug = new Map<string, string>();
    for (const c of allDbCats) {
      const id = c._id.toString();
      catIdBySlug.set(c.slug, id);
      catIdBySlug.set(`cat_${c.slug}`, id);
      catIdBySlug.set(`cat_${c.slug.replace(/-/g, "_")}`, id);
    }

    // 2. Seed Collections
    const colCol = await getCollection(COLLECTIONS.COLLECTIONS);
    for (const col of INITIAL_COLLECTIONS) {
      const { _id, ...colData } = col;
      await colCol.updateOne(
        { slug: col.slug },
        {
          $setOnInsert: {
            ...colData,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      );
    }
    const allDbCols = await colCol.find().toArray();
    const colIdBySlug = new Map<string, string>();
    for (const col of allDbCols) {
      const id = col._id.toString();
      colIdBySlug.set(col.slug, id);
      colIdBySlug.set(`col_${col.slug}`, id);
      colIdBySlug.set(`col_${col.slug.replace(/-/g, "_")}`, id);
    }
    colIdBySlug.set("col_royal_edit", colIdBySlug.get("royal-burgundy-edit") || "");

    // 3. Seed Products
    const prodCol = await getCollection(COLLECTIONS.PRODUCTS);
    for (const prod of INITIAL_PRODUCTS) {
      const { _id, ...prodData } = prod;
      const resolvedCatId = catIdBySlug.get(prod.categoryId) || prod.categoryId;
      const resolvedColIds = (prod.collectionIds || []).map(
        (cId) => colIdBySlug.get(cId) || cId
      );

      await prodCol.updateOne(
        { slug: prod.slug },
        {
          $setOnInsert: {
            ...prodData,
            categoryId: resolvedCatId,
            collectionIds: resolvedColIds,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      );
    }

    // 4. Seed Settings Singleton
    const settingsCol = await getCollection(COLLECTIONS.SETTINGS);
    const existingSettings = await settingsCol.findOne({});
    if (!existingSettings) {
      await settingsCol.insertOne({
        ...DEFAULT_SETTINGS,
        updatedAt: new Date(),
      });
    }

    // 5. Seed Homepage CMS Singleton
    const cmsCol = await getCollection(COLLECTIONS.HOMEPAGE);
    const existingCMS = await cmsCol.findOne({});
    if (!existingCMS) {
      await cmsCol.insertOne({
        ...INITIAL_HOMEPAGE_CMS,
        updatedAt: new Date(),
      });
    }

    isSeeded = true;
  } catch (err: unknown) {
    console.warn("Database seed warning:", err);
  } finally {
    isSeeding = false;
  }
}
