import { cacheTag, cacheLife } from "next/cache";
import { getCollection, COLLECTIONS } from "@/lib/db/client";
import { HomepageCMS, DEFAULT_HOMEPAGE_CMS } from "@/lib/schemas/homepage";

export async function getHomepageCMS(): Promise<HomepageCMS> {
  "use cache";
  cacheTag("homepage");
  cacheLife("hours");

  try {
    const col = await getCollection<HomepageCMS>(COLLECTIONS.HOMEPAGE);
    const doc = await col.findOne({});
    if (doc) {
      return JSON.parse(JSON.stringify(doc));
    }
  } catch (err: unknown) {
    console.warn("Homepage CMS query fallback:", err);
  }

  return DEFAULT_HOMEPAGE_CMS;
}
