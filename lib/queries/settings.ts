import { cacheTag, cacheLife } from "next/cache";
import { getCollection, COLLECTIONS } from "@/lib/db/client";
import { Settings } from "@/lib/schemas/settings";
import { DEFAULT_SETTINGS } from "@/lib/data";

export async function getSettings(): Promise<Settings> {
  "use cache";
  cacheTag("settings");
  cacheLife("days");

  try {
    const col = await getCollection<Settings>(COLLECTIONS.SETTINGS);
    const doc = await col.findOne({});
    if (doc) {
      return JSON.parse(JSON.stringify(doc));
    }
  } catch (err: unknown) {
    console.warn("Settings lookup fallback:", err);
  }

  return DEFAULT_SETTINGS;
}
