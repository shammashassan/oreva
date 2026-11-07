import { z } from "zod";

export const enquirySchema = z.object({
  _id: z.string().optional(),
  productId: z.string().min(1, "Product ID is required"),
  productName: z.string().min(1, "Product name is required"),
  productSku: z.string().min(1, "Product SKU is required"),
  productPrice: z.number().optional(),
  source: z.string().default("product_page"),
  clickedAt: z.coerce.date().default(() => new Date()),
});

export type Enquiry = z.infer<typeof enquirySchema>;
export type EnquiryInput = z.input<typeof enquirySchema>;
