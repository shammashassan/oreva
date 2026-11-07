import { z } from "zod";

export const categorySchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(2, "Category name is required"),
  slug: z.string().min(2, "Slug is required"),
  description: z.string().default(""),
  image: z.string().refine(
    (val) =>
      val.startsWith("/") ||
      val.startsWith("http://") ||
      val.startsWith("https://"),
    { message: "Must be a valid image URL or root-relative path" }
  ),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
  seo: z
    .object({
      title: z.string().optional().default(""),
      description: z.string().optional().default(""),
    })
    .optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type Category = z.infer<typeof categorySchema>;
export type CategoryInput = z.input<typeof categorySchema>;
