"use server";

import { getCollection, COLLECTIONS } from "@/lib/db/client";
import { enquirySchema, EnquiryInput } from "@/lib/schemas/enquiry";
import { getSettings } from "@/lib/queries/settings";

export interface WhatsAppEnquiryResult {
  whatsappUrl: string;
}

/**
 * Server Action: Records an enquiry click in MongoDB and formats a prefilled WhatsApp enquiry URL.
 */
export async function trackWhatsAppEnquiry(
  input: EnquiryInput & { productUrl?: string }
): Promise<WhatsAppEnquiryResult> {
  const validated = enquirySchema.parse(input);
  const settings = await getSettings();
  const { _id, ...enquiryPayload } = validated;

  // Asynchronously record enquiry click in MongoDB without blocking
  try {
    const col = await getCollection(COLLECTIONS.ENQUIRIES);
    await col.insertOne({
      ...enquiryPayload,
      clickedAt: new Date(),
    });
  } catch (err: unknown) {
    console.warn("Could not record enquiry click to database:", err);
  }

  // Generate luxury prefilled WhatsApp message
  const number = settings.whatsappNumber.replace(/[^0-9]/g, "");
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://oreva-jewellery.vercel.app";
  let url = input.productUrl || `${baseUrl}/products/${validated.productId}`;
  if (url.includes("localhost") || url.includes("127.0.0.1")) {
    url = url.replace(/https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/, baseUrl);
  }

  const messageLines = [
    `*${settings.brandName} — Jewellery Concierge Enquiry*`,
    "",
    `I would like to enquire about:`,
    `• *Piece:* ${validated.productName}`,
    `• *SKU:* ${validated.productSku}`,
    validated.productPrice ? `• *Price:* £${validated.productPrice.toLocaleString()}` : "",
    `• *Link:* ${url}`,
    "",
    `Please advise on availability and personalized ordering assistance.`,
  ].filter(Boolean);

  const encoded = encodeURIComponent(messageLines.join("\n"));
  const whatsappUrl = `https://wa.me/${number}?text=${encoded}`;

  return { whatsappUrl };
}
