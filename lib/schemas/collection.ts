import { z } from "zod";

export const collectionSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(2, "Collection name is required"),
  slug: z.string().min(2, "Slug is required"),
  description: z.string().default(""),
  image: z.string().refine(
    (val) =>
      val.startsWith("/") ||
      val.startsWith("http://") ||
      val.startsWith("https://"),
    { message: "Must be a valid image URL or root-relative path" }
  ),
  bannerImage: z
    .string()
    .refine(
      (val) =>
        val.startsWith("/") ||
        val.startsWith("http://") ||
        val.startsWith("https://"),
      { message: "Must be a valid image URL or root-relative path" }
    )
    .optional()
    .nullable(),
  productIds: z.array(z.string()).default([]),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
  seo: z
    .object({
      title: z.string().optional().default(""),
      description: z.string().optional().default(""),
    })
    .optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type Collection = z.infer<typeof collectionSchema>;
export type CollectionInput = z.input<typeof collectionSchema>;
