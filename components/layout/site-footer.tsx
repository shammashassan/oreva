export function SiteFooter() {
  return (
    <footer className="dark:bg-transparent">
      <div className="mx-auto max-w-7xl px-4 xl:px-6">
        <div className="flex h-(--footer-height) items-center justify-between">
          <div className="text-muted-foreground w-full px-1 text-center text-xs leading-loose sm:text-sm">
            Built by{" "}
            <a
              href="https://www.instagram.com/shammas_hassan/"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Shammas
            </a>{" "}
            .
          </div>
        </div>
      </div>
    </footer>
  );
}
