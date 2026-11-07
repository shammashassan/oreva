"use server";

import { ObjectId, Filter, Document } from "mongodb";
import { COLLECTIONS } from "@/lib/db/client";
import { runInTransaction } from "@/lib/db/transaction";
import { collectionSchema, CollectionInput } from "@/lib/schemas/collection";
import { safeInvalidateTags } from "./revalidate";

export async function saveCollection(
  input: CollectionInput
): Promise<{ success: boolean; id: string }> {
  const validated = collectionSchema.parse(input);
  const { _id, ...docPayload } = validated;

  const result = await runInTransaction(async (session, db) => {
    const col = db.collection(COLLECTIONS.COLLECTIONS);

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

  await safeInvalidateTags(["collections", `collection-${validated.slug}`]);
  return result;
}

export async function deleteCollection(
  id: string,
  slug?: string
): Promise<{ success: boolean }> {
  await runInTransaction(async (session, db) => {
    const col = db.collection(COLLECTIONS.COLLECTIONS);
    const filter: Filter<Document> = ObjectId.isValid(id)
      ? { _id: new ObjectId(id) }
      : { slug: id };
    await col.deleteOne(filter, { session: session ?? undefined });
  });

  const tags = ["collections"];
  if (slug) tags.push(`collection-${slug}`);
  await safeInvalidateTags(tags);

  return { success: true };
}
