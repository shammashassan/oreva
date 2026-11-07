"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background px-6 text-center">
      <div className="max-w-md flex flex-col items-center gap-6">
        <span className="font-serif text-4xl text-primary tracking-widest">
          ORÉVA
        </span>
        <div className="space-y-2">
          <h1 className="font-serif text-2xl text-foreground">
            Something went wrong
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            An unexpected error occurred while loading this experience. Please
            try again or return to our boutique.
          </p>
        </div>
        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-sm bg-primary text-primary-foreground text-xs font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-2.5 rounded-sm border border-border text-foreground text-xs font-medium tracking-widest uppercase hover:bg-muted transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
