"use client";

import { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin portal error:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="max-w-lg w-full text-center">
        <CardHeader>
          <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-2">
            <AlertCircle className="size-5" />
          </div>
          <CardTitle>Admin Operation Failed</CardTitle>
          <CardDescription>
            {error.message || "An unexpected error occurred while loading administration data."}
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Button onClick={() => reset()} size="sm">
            Retry
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
