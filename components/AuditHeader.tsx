import Link from "next/link";

function AfricaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path
        d="M31 4L22 9L18 18L11 24L9 34L14 41L16 50L24 57L33 60L38 53L45 49L48 41L54 35L53 27L47 22L45 15L38 9L31 4Z"
        fill="#D4521A"
      />
    </svg>
  );
}

export function AuditHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-brand-light/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-brand-orange">
          <AfricaIcon />
          <span className="text-xl">Restoscopie</span>
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium md:gap-5">
          <Link className="text-brand-text transition-all duration-200 hover:text-brand-orange" href="/">
            Tableau de bord
          </Link>
          <Link
            className="text-brand-text transition-all duration-200 hover:text-brand-orange"
            href="/audit"
          >
            Nouvel audit
          </Link>
        </nav>
      </div>
    </header>
  );
}
