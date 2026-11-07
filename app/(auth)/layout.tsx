import * as React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | ORÉVA",
  description: "Sign in to access ORÉVA administrative management.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#241B1B] text-[#FFF9F1]">
      {/* Subtle brand top bar */}
      <header className="p-6 sm:p-8 flex items-center justify-between border-b border-[#382b2b]/60">
        <Link href="/" className="inline-block">
          <span className="font-serif text-2xl tracking-[0.25em] text-[#FFF9F1] uppercase">
            ORÉVA
          </span>
          <span className="block text-[8px] tracking-[0.35em] text-[#C7A66B] uppercase">
            Jewellery House
          </span>
        </Link>
        <Link
          href="/"
          className="text-xs uppercase tracking-widest text-[#EDE1D1] hover:text-[#C7A66B] transition-colors"
        >
          Return to Storefront
        </Link>
      </header>

      {/* Main Form Center */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">{children}</div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-[11px] text-[#A89B93] border-t border-[#382b2b]/60">
        © 2026 ORÉVA Fine Jewellery House. Administrative Portal.
      </footer>
    </div>
  );
}
