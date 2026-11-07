"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global catastrophic error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FFF9F1] text-[#241B1B] flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-6">
          <h1 className="text-3xl font-serif tracking-widest text-[#491323]">
            ORÉVA
          </h1>
          <p className="text-sm text-[#6F635D]">
            A critical system error occurred. Our team has been notified.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 bg-[#491323] text-[#FFF9F1] text-xs uppercase tracking-widest rounded-sm"
          >
            Reload Experience
          </button>
        </div>
      </body>
    </html>
  );
}
