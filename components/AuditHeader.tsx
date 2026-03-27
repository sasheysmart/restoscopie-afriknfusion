import Link from "next/link";

/** Logo source « blanc » : sur fond clair, filtre pour obtenir une version lisible (noir). */
export function AfrikNFusionLogo({
  className,
  height = 40,
}: {
  className?: string;
  height?: number;
}) {
  return (
    <img
      src="/AfrikNFusion_logo_blanc.svg"
      alt="Afrik'N'Fusion"
      width={291}
      height={99}
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}

export function AuditHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 py-3 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 font-bold text-brand-text transition-all duration-200 hover:opacity-90"
        >
          <AfrikNFusionLogo
            className="brightness-0 contrast-100"
            height={36}
          />
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
