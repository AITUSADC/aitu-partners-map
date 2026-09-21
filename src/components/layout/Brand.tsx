export function Brand({ compact = false }: { compact?: boolean }) {
  return <span className={`brand ${compact ? "brand-compact" : ""}`}>
    <svg className="brand-mark" viewBox="0 0 40 44" fill="none" aria-hidden="true">
      <path d="m20 2 17 10v20L20 42 3 32V12L20 2Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="m12 30 8-18 8 18M15 24h10" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m20 2 17 10-9 5M3 32l9-5" stroke="currentColor" opacity=".35" />
    </svg>
    {!compact && <span className="brand-wordmark"><strong>AITU<span>PARTNERS</span></strong><small>A little more to student life.</small></span>}
  </span>;
}
