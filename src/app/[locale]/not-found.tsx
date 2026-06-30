import Link from "next/link";
import { DEFAULT_LOCALE } from "@/lib/i18n";

export default function LocaleNotFound() {
  return (
    <div className="ds-shell grid min-h-screen place-items-center pt-20">
      <div className="text-center" data-reveal>
        <p className="ds-section-num">404</p>
        <h1 className="display-text mt-4 text-[length:var(--fs-h1)]">
          This page drifted off-grid.
        </h1>
        <p className="ds-muted mt-4 max-w-md mx-auto">
          The page you&apos;re looking for isn&apos;t here — it may have moved or
          never existed. Let&apos;s get you back to solid ground.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href={`/${DEFAULT_LOCALE}`} className="ds-action ds-action-primary">
            Return home
          </Link>
          <Link href={`/${DEFAULT_LOCALE}#projects`} className="ds-action">
            View work
          </Link>
        </div>
      </div>
    </div>
  );
}
