"use server";

import { cloudinary } from "@/lib/cloudinary";

export interface UploadResponse {
  success: boolean;
  url?: string;
  error?: string;
}

export interface MultiUploadResponse {
  success: boolean;
  urls: string[];
  errors: string[];
}

export async function uploadImageAction(
  formData: FormData,
  folder = "oreva/products"
): Promise<UploadResponse> {
  try {
    const file = formData.get("file");
    if (!file || !(file instanceof File)) {
      return { success: false, error: "No image file provided." };
    }

    if (file.size > 10 * 1024 * 1024) {
      return { success: false, error: "Image size exceeds 10MB limit." };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
        },
        (error, res) => {
          if (error || !res) {
            reject(error ?? new Error("Cloudinary upload failed"));
          } else {
            resolve(res);
          }
        }
      );
      stream.end(buffer);
    });

    return {
      success: true,
      url: result.secure_url,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to upload image to Cloudinary";
    console.error("Cloudinary upload error:", err);
    return { success: false, error: msg };
  }
}

export async function uploadMultipleImagesAction(
  formData: FormData,
  folder = "oreva/products"
): Promise<MultiUploadResponse> {
  const files = formData.getAll("files");
  const urls: string[] = [];
  const errors: string[] = [];

  for (const item of files) {
    if (item instanceof File) {
      const singleData = new FormData();
      singleData.append("file", item);
      const res = await uploadImageAction(singleData, folder);
      if (res.success && res.url) {
        urls.push(res.url);
      } else if (res.error) {
        errors.push(res.error);
      }
    }
  }

  return {
    success: urls.length > 0,
    urls,
    errors,
  };
}
