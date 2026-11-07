"use server";

import { COLLECTIONS } from "@/lib/db/client";
import { runInTransaction } from "@/lib/db/transaction";
import { settingsSchema, Settings } from "@/lib/schemas/settings";
import { safeInvalidateTags } from "./revalidate";

export async function updateSettings(data: Settings): Promise<{ success: boolean }> {
  const validated = settingsSchema.parse(data);

  await runInTransaction(async (session, db) => {
    const col = db.collection(COLLECTIONS.SETTINGS);
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

  await safeInvalidateTags(["settings"]);
  return { success: true };
}
