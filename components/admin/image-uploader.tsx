"use client";

import * as React from "react";
import Image from "next/image";
import { UploadCloud, X, Loader2, Link2, Plus, RefreshCw, FolderGit2, CheckCircle2 } from "lucide-react";
import { uploadImageAction } from "@/lib/actions/upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FieldLabel, FieldDescription } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { cn } from "cn";

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  multiple?: boolean;
  maxFiles?: number;
  folder?: string;
  label?: string;
  description?: string;
}

export function ImageUploader({
  images,
  onChange,
  multiple = false,
  maxFiles = 6,
  folder = "oreva/products",
  label = "Photography",
  description = "Upload images directly to Cloudinary or link existing image URLs.",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [urlInput, setUrlInput] = React.useState("");
  const [showUrlInput, setShowUrlInput] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const processFiles = async (fileList: FileList | File[]) => {
    if (!fileList || fileList.length === 0) return;

    setIsUploading(true);
    const newUrls: string[] = [];

    try {
      const filesArray = Array.from(fileList);
      for (let i = 0; i < filesArray.length; i++) {
        if (!multiple && i > 0) break;
        if (multiple && images.length + newUrls.length >= maxFiles) {
          toast.add({
            title: "Upload Limit",
            description: `Maximum ${maxFiles} images allowed.`,
            type: "warning",
          });
          break;
        }

        const file = filesArray[i];
        if (!file.type.startsWith("image/")) {
          toast.add({
            title: "Invalid File",
            description: `${file.name} is not an image.`,
            type: "error",
          });
          continue;
        }

        const formData = new FormData();
        formData.append("file", file);

        const res = await uploadImageAction(formData, folder);
        if (res.success && res.url) {
          newUrls.push(res.url);
        } else {
          toast.add({
            title: "Upload Failed",
            description: res.error || "Could not upload image to Cloudinary.",
            type: "error",
          });
        }
      }

      if (newUrls.length > 0) {
        if (multiple) {
          onChange([...images, ...newUrls]);
        } else {
          onChange([newUrls[0]]);
        }
        toast.add({
          title: "Uploaded to Cloudinary",
          description: `Stored in "${folder}" successfully.`,
          type: "success",
        });
      }
    } catch (err: unknown) {
      console.error("Upload error:", err);
      toast.add({
        title: "Upload Error",
        description: err instanceof Error ? err.message : "An unexpected error occurred during Cloudinary upload.",
        type: "error",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isUploading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (!isUploading && e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleAddManualUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;

    if (
      !trimmed.startsWith("http://") &&
      !trimmed.startsWith("https://") &&
      !trimmed.startsWith("/")
    ) {
      toast.add({
        title: "Invalid URL / Path",
        description: "Please enter a valid HTTP/HTTPS URL or /images/ path.",
        type: "error",
      });
      return;
    }

    if (multiple) {
      if (images.length >= maxFiles) {
        toast.add({
          title: "Limit Reached",
          description: `Maximum of ${maxFiles} images reached.`,
          type: "warning",
        });
        return;
      }
      onChange([...images, trimmed]);
    } else {
      onChange([trimmed]);
    }

    setUrlInput("");
    toast.add({
      title: "Image Added",
      description: "Direct image reference updated.",
      type: "success",
    });
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  const isCloudinary = (url: string) => url.includes("cloudinary.com");

  return (
    <div className="flex flex-col gap-3">
      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp, image/avif"
        multiple={multiple}
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Header with Title, Cloudinary Folder Badge and URL Input Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <FieldLabel className="mb-0">{label}</FieldLabel>
          <Badge variant="outline">
            <FolderGit2 className="size-3" />
            <span>{folder}</span>
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowUrlInput(!showUrlInput)}
          >
            <Link2 data-icon="inline-start" />
            <span>{showUrlInput ? "Hide Link" : "Paste URL / Path"}</span>
          </Button>
        </div>
      </div>

      {description && <FieldDescription>{description}</FieldDescription>}

      {/* Manual URL Input drawer */}
      {showUrlInput && (
        <div className="flex items-center gap-2 p-2.5 rounded-lg border bg-muted/30">
          <Input
            type="text"
            placeholder="https://res.cloudinary.com/... or /images/..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1"
          />
          <Button
            type="button"
            size="sm"
            onClick={handleAddManualUrl}
          >
            <Plus data-icon="inline-start" />
            <span>Apply</span>
          </Button>
        </div>
      )}

      {/* SINGLE IMAGE MODE WITH EXISTING IMAGE */}
      {!multiple && images.length > 0 ? (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-3 rounded-lg border bg-card shadow-xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative size-16 rounded-lg overflow-hidden border bg-muted shrink-0">
              <Image
                src={images[0]}
                alt={label}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-medium text-foreground truncate max-w-[200px] sm:max-w-[280px]">
                  {images[0].split("/").pop() || "Image Asset"}
                </span>
                {isCloudinary(images[0]) ? (
                  <Badge variant="secondary">
                    <CheckCircle2 className="size-3" />
                    <span>Cloudinary CDN</span>
                  </Badge>
                ) : (
                  <Badge variant="outline">
                    Local Asset
                  </Badge>
                )}
              </div>
              <p className="font-mono text-xs text-muted-foreground truncate max-w-[220px] sm:max-w-[340px]">
                {images[0]}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
            >
              {isUploading ? (
                <Loader2 data-icon="inline-start" className="animate-spin" />
              ) : (
                <RefreshCw data-icon="inline-start" />
              )}
              <span>{isUploading ? "Uploading..." : "Replace"}</span>
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              disabled={isUploading}
              onClick={() => onChange([])}
            >
              <X data-icon="inline-start" />
              <span>Remove</span>
            </Button>
          </div>
        </div>
      ) : null}

      {/* DROPZONE: Displayed when no single image, or in multiple mode when below maxFiles */}
      {(!multiple && images.length === 0) || (multiple && images.length < maxFiles) ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={cn(
            "relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-all text-center select-none border-border hover:border-primary/60 hover:bg-muted/50 bg-muted/20",
            isDragging && "border-primary bg-primary/10",
            isUploading && "pointer-events-none opacity-60"
          )}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 py-3">
              <Loader2 className="size-6 animate-spin text-primary" />
              <p className="text-xs text-foreground font-medium">
                Uploading directly to Cloudinary ({folder})...
              </p>
              <p className="text-xs text-muted-foreground">
                Optimizing format & streaming to CDN
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-2">
              <div
                className={cn(
                  "size-10 rounded-full flex items-center justify-center transition-colors",
                  isDragging
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary"
                )}
              >
                <UploadCloud className="size-5" />
              </div>
              <p className="text-xs text-foreground font-medium">
                {isDragging
                  ? "Drop image here to upload directly to Cloudinary"
                  : `Click to browse or drag & drop ${multiple ? "images" : "an image"} here`}
              </p>
              <p className="text-xs text-muted-foreground">
                Saves to Cloudinary folder <code className="font-mono text-foreground font-medium">{folder}</code> • PNG, JPG, WebP up to 10MB
              </p>
            </div>
          )}
        </div>
      ) : null}

      {/* MULTIPLE IMAGES PREVIEW GALLERY */}
      {multiple && images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-1">
          {images.map((imgUrl, idx) => (
            <div
              key={`${imgUrl}-${idx}`}
              className="group relative aspect-square rounded-lg overflow-hidden border bg-muted/40 shadow-xs"
            >
              <Image
                src={imgUrl}
                alt={`Image preview ${idx + 1}`}
                fill
                sizes="140px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon-xs"
                  onClick={() => handleRemoveImage(idx)}
                  title="Remove image"
                >
                  <X data-icon="inline-start" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
              {idx === 0 && (
                <Badge variant="secondary" className="absolute bottom-1.5 left-1.5">
                  Cover
                </Badge>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
