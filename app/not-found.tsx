import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background px-6 text-center">
      <div className="max-w-md flex flex-col items-center gap-6">
        <span className="font-serif text-5xl text-accent tracking-[0.2em]">
          ORÉVA
        </span>
        <div className="w-12 h-px bg-accent/40" />
        <div className="space-y-2">
          <h1 className="font-serif text-3xl text-foreground font-light">
            404 — Page Not Found
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The piece or page you are looking for does not exist or may have been
            moved to our archives.
          </p>
        </div>
        <Link
          href="/"
          className="mt-4 px-8 py-3 bg-primary text-primary-foreground text-xs font-medium tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors rounded-sm"
        >
          Explore Boutique
        </Link>
      </div>
    </div>
  );
}
