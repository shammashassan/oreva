"use server";

import { ObjectId, Filter, Document } from "mongodb";
import { COLLECTIONS } from "@/lib/db/client";
import { runInTransaction } from "@/lib/db/transaction";
import { getNextSequence } from "@/lib/db/counters";
import { productSchema, ProductInput } from "@/lib/schemas/product";
import { safeInvalidateTags } from "./revalidate";

export async function saveProduct(input: ProductInput): Promise<{ success: boolean; id: string }> {
  const validated = productSchema.parse(input);
  const { _id, ...docPayload } = validated;

  const result = await runInTransaction(async (session, db) => {
    const col = db.collection(COLLECTIONS.PRODUCTS);

    if (_id) {
      const filter: Filter<Document> = ObjectId.isValid(_id)
        ? { _id: new ObjectId(_id) }
        : { sku: _id };

      await col.updateOne(
        filter,
        {
          $set: {
            ...docPayload,
            updatedAt: new Date(),
          },
        },
        { session: session ?? undefined }
      );
      return { success: true, id: _id };
    } else {
      let sku = docPayload.sku;
      if (!sku || sku === "AUTO") {
        const seq = await getNextSequence("product_sku", session);
        sku = `ORV-${String(seq).padStart(4, "0")}`;
      }

      const res = await col.insertOne(
        {
          ...docPayload,
          sku,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { session: session ?? undefined }
      );
      return { success: true, id: res.insertedId.toString() };
    }
  });

  await safeInvalidateTags(["products", `product-${validated.slug}`]);
  return result;
}

export async function deleteProduct(id: string, slug?: string): Promise<{ success: boolean }> {
  await runInTransaction(async (session, db) => {
    const col = db.collection(COLLECTIONS.PRODUCTS);
    const filter: Filter<Document> = ObjectId.isValid(id)
      ? { _id: new ObjectId(id) }
      : { sku: id };
    await col.deleteOne(filter, { session: session ?? undefined });
  });

  const tags = ["products"];
  if (slug) tags.push(`product-${slug}`);
  await safeInvalidateTags(tags);

  return { success: true };
}
