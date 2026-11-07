import { z } from "zod";

export const productVariantSchema = z.object({
  name: z.string().min(1, "Variant name is required"),
  options: z.array(z.string().min(1)).min(1, "At least one option is required"),
});

export const productSeoSchema = z.object({
  title: z.string().optional().default(""),
  description: z.string().optional().default(""),
});

export const productSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(2, "Product name must be at least 2 characters"),
  slug: z.string().min(2, "Slug is required"),
  sku: z.string().min(2, "SKU is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be greater than 0"),
  compareAtPrice: z.number().positive().optional().nullable(),
  images: z
    .array(
      z.string().refine(
        (val) =>
          val.startsWith("/") ||
          val.startsWith("http://") ||
          val.startsWith("https://"),
        { message: "Must be a valid image URL or root-relative path" }
      )
    )
    .min(1, "At least one product image is required"),
  categoryId: z.string().min(1, "Category is required"),
  collectionIds: z.array(z.string()).default([]),
  gender: z.enum(["women", "men", "unisex"]).default("women"),
  variants: z.array(productVariantSchema).default([]),
  isFeatured: z.boolean().default(false),
  isBestseller: z.boolean().default(false),
  isNewArrival: z.boolean().default(false),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
  seo: productSeoSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type Product = z.infer<typeof productSchema>;
export type ProductInput = z.input<typeof productSchema>;
