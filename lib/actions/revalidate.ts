import { revalidateTag, updateTag } from "next/cache";

/**
 * Resilient cache invalidation helper supporting both immediate read-your-own-writes
 * and background invalidations per Next.js standards.
 */
export async function safeInvalidateTags(tags: string[]): Promise<void> {
  for (const tag of tags) {
    try {
      // Immediate read-your-own-writes
      updateTag(tag);
      // Background revalidation (2-argument format)
      revalidateTag(tag, "max");
    } catch (err: unknown) {
      console.warn(`Failed to invalidate cache tag "${tag}":`, err);
    }
  }
}
