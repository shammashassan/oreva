import { cacheTag, cacheLife } from "next/cache";
import { getCollection, COLLECTIONS } from "@/lib/db/client";
import { HomepageCMS, DEFAULT_HOMEPAGE_CMS } from "@/lib/schemas/homepage";

export async function getHomepageCMS(): Promise<HomepageCMS> {
  "use cache";
  cacheTag("homepage");
  cacheLife("hours");

  try {
    const col = await getCollection(COLLECTIONS.HOMEPAGE);
    const doc = await col.findOne({});
    if (doc) {
      const plain = JSON.parse(JSON.stringify(doc)) as Partial<HomepageCMS> & { _id?: unknown };
      delete plain._id;

      const merged: HomepageCMS = {
        ...DEFAULT_HOMEPAGE_CMS,
        ...plain,
        announcement: {
          ...DEFAULT_HOMEPAGE_CMS.announcement,
          ...(plain.announcement ?? {}),
        },
        hero: {
          ...DEFAULT_HOMEPAGE_CMS.hero,
          ...(plain.hero ?? {}),
        },
        editorialBanner: {
          ...DEFAULT_HOMEPAGE_CMS.editorialBanner,
          ...(plain.editorialBanner ?? {}),
        },
        sectionVisibility: {
          ...DEFAULT_HOMEPAGE_CMS.sectionVisibility,
          ...(plain.sectionVisibility ?? {}),
        },
        genderBanners:
          Array.isArray(plain.genderBanners) && plain.genderBanners.length >= 2
            ? plain.genderBanners
            : DEFAULT_HOMEPAGE_CMS.genderBanners,
      };

      return merged;
    }
  } catch (err: unknown) {
    console.warn("Homepage CMS query fallback:", err);
  }

  return DEFAULT_HOMEPAGE_CMS;
}
