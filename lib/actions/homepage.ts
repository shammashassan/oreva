"use server";

import { revalidatePath } from "next/cache";
import { COLLECTIONS } from "@/lib/db/client";
import { runInTransaction } from "@/lib/db/transaction";
import { homepageSchema, HomepageCMS } from "@/lib/schemas/homepage";
import { safeInvalidateTags } from "./revalidate";

export async function updateHomepageCMS(data: HomepageCMS): Promise<{ success: boolean }> {
  const validated = homepageSchema.parse(data);

  await runInTransaction(async (session, db) => {
    const col = db.collection(COLLECTIONS.HOMEPAGE);
    await col.updateOne(
      {},
      {
        $set: {
          ...validated,
          updatedAt: new Date(),
        },
      },
      { upsert: true, session: session ?? undefined }
    );
  });

  await safeInvalidateTags(["homepage"]);
  try {
    revalidatePath("/", "layout");
    revalidatePath("/admin/homepage");
  } catch (err: unknown) {
    console.warn("Failed to revalidate homepage paths:", err);
  }
  return { success: true };
}
