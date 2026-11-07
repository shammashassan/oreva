import { z } from "zod";

export const settingsSchema = z.object({
  brandName: z.string().min(1, "Brand name required"),
  descriptor: z.string().min(1, "Descriptor required"),
  tagline: z.string().min(1, "Tagline required"),
  whatsappNumber: z
    .string()
    .min(5, "Valid WhatsApp number is required"),
  contactEmail: z.string().email("Valid email required"),
  phone: z.string().min(1, "Phone required"),
  address: z.string().min(1, "Address required"),
  socialLinks: z.object({
    instagram: z.string(),
    pinterest: z.string(),
    facebook: z.string(),
  }),
  currencySymbol: z.string(),
  seoDefaults: z
    .object({
      title: z.string(),
      description: z.string(),
    })
    .optional(),
});

export type Settings = z.infer<typeof settingsSchema>;
