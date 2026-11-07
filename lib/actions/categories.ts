"use server";

import { ObjectId, Filter, Document } from "mongodb";
import { COLLECTIONS } from "@/lib/db/client";
import { runInTransaction } from "@/lib/db/transaction";
import { categorySchema, CategoryInput } from "@/lib/schemas/category";
import { safeInvalidateTags } from "./revalidate";

export async function saveCategory(input: CategoryInput): Promise<{ success: boolean; id: string }> {
  const validated = categorySchema.parse(input);
  const { _id, ...docPayload } = validated;

  const result = await runInTransaction(async (session, db) => {
    const col = db.collection(COLLECTIONS.CATEGORIES);

    if (_id) {
      const filter: Filter<Document> = ObjectId.isValid(_id)
        ? { _id: new ObjectId(_id) }
        : { slug: _id };

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
      const res = await col.insertOne(
        {
          ...docPayload,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { session: session ?? undefined }
      );
      return { success: true, id: res.insertedId.toString() };
    }
  });

  await safeInvalidateTags(["categories", `category-${validated.slug}`]);
  return result;
}

export async function deleteCategory(id: string, slug?: string): Promise<{ success: boolean }> {
  await runInTransaction(async (session, db) => {
    const col = db.collection(COLLECTIONS.CATEGORIES);
    const filter: Filter<Document> = ObjectId.isValid(id)
      ? { _id: new ObjectId(id) }
      : { slug: id };
    await col.deleteOne(filter, { session: session ?? undefined });
  });

  const tags = ["categories"];
  if (slug) tags.push(`category-${slug}`);
  await safeInvalidateTags(tags);

  return { success: true };
}
