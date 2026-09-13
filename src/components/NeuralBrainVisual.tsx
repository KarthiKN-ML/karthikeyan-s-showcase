export function NeuralBrainVisual({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-square w-full overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 via-background to-amber-50 shadow-2xl shadow-sky-900/10 ring-1 ring-border/40 ${className}`}>
      <svg viewBox="0 0 400 400" className="size-full" aria-label="Neural network diagram">
        <defs>
          <radialGradient id="ng" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgb(56,189,248)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="rgb(56,189,248)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lineG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(14,165,233)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="rgb(251,146,60)" stopOpacity="0.45" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="180" fill="url(#ng)" />
        <g stroke="url(#lineG)" strokeWidth="1.2" fill="none" opacity="0.7">
          <line x1="80" y1="120" x2="160" y2="90" />
          <line x1="160" y1="90" x2="240" y2="100" />
          <line x1="240" y1="100" x2="320" y2="140" />
          <line x1="80" y1="120" x2="140" y2="180" />
          <line x1="160" y1="90" x2="200" y2="180" />
          <line x1="240" y1="100" x2="260" y2="190" />
          <line x1="320" y1="140" x2="300" y2="220" />
          <line x1="140" y1="180" x2="200" y2="180" />
          <line x1="200" y1="180" x2="260" y2="190" />
          <line x1="260" y1="190" x2="300" y2="220" />
          <line x1="140" y1="180" x2="120" y2="260" />
          <line x1="200" y1="180" x2="180" y2="270" />
          <line x1="200" y1="180" x2="230" y2="280" />
          <line x1="260" y1="190" x2="280" y2="270" />
          <line x1="120" y1="260" x2="180" y2="270" />
          <line x1="180" y1="270" x2="230" y2="280" />
          <line x1="230" y1="280" x2="280" y2="270" />
          <line x1="120" y1="260" x2="100" y2="320" />
          <line x1="180" y1="270" x2="160" y2="340" />
          <line x1="230" y1="280" x2="250" y2="340" />
          <line x1="280" y1="270" x2="310" y2="320" />
          <line x1="80" y1="120" x2="60" y2="200" />
          <line x1="60" y1="200" x2="120" y2="260" />
          <line x1="320" y1="140" x2="350" y2="210" />
          <line x1="350" y1="210" x2="300" y2="220" />
          <line x1="160" y1="90" x2="200" y2="50" />
          <line x1="240" y1="100" x2="280" y2="50" />
          <line x1="200" y1="50" x2="280" y2="50" />
        </g>
        <g fill="rgb(14,165,233)">
          <circle cx="80" cy="120" r="14" opacity="0.12" /><circle cx="80" cy="120" r="5" opacity="0.85" />
          <circle cx="160" cy="90" r="17" opacity="0.12" /><circle cx="160" cy="90" r="6" opacity="0.85" />
          <circle cx="240" cy="100" r="15" opacity="0.12" /><circle cx="240" cy="100" r="5.5" opacity="0.85" />
          <circle cx="320" cy="140" r="14" opacity="0.12" /><circle cx="320" cy="140" r="5" opacity="0.85" />
          <circle cx="140" cy="180" r="18" opacity="0.12" /><circle cx="140" cy="180" r="6.5" opacity="0.85" />
          <circle cx="200" cy="180" r="20" opacity="0.12" /><circle cx="200" cy="180" r="7" opacity="0.85" />
          <circle cx="260" cy="190" r="17" opacity="0.12" /><circle cx="260" cy="190" r="6" opacity="0.85" />
          <circle cx="300" cy="220" r="14" opacity="0.12" /><circle cx="300" cy="220" r="5" opacity="0.85" />
          <circle cx="120" cy="260" r="15" opacity="0.12" /><circle cx="120" cy="260" r="5.5" opacity="0.85" />
          <circle cx="180" cy="270" r="17" opacity="0.12" /><circle cx="180" cy="270" r="6" opacity="0.85" />
          <circle cx="230" cy="280" r="15" opacity="0.12" /><circle cx="230" cy="280" r="5.5" opacity="0.85" />
          <circle cx="280" cy="270" r="14" opacity="0.12" /><circle cx="280" cy="270" r="5" opacity="0.85" />
          <circle cx="100" cy="320" r="13" opacity="0.12" /><circle cx="100" cy="320" r="4.5" opacity="0.85" />
          <circle cx="160" cy="340" r="14" opacity="0.12" /><circle cx="160" cy="340" r="5" opacity="0.85" />
          <circle cx="250" cy="340" r="14" opacity="0.12" /><circle cx="250" cy="340" r="5" opacity="0.85" />
          <circle cx="310" cy="320" r="13" opacity="0.12" /><circle cx="310" cy="320" r="4.5" opacity="0.85" />
          <circle cx="60" cy="200" r="13" opacity="0.12" /><circle cx="60" cy="200" r="4.5" opacity="0.85" />
          <circle cx="350" cy="210" r="13" opacity="0.12" /><circle cx="350" cy="210" r="4.5" opacity="0.85" />
          <circle cx="200" cy="50" r="14" opacity="0.12" /><circle cx="200" cy="50" r="5" opacity="0.85" />
          <circle cx="280" cy="50" r="13" opacity="0.12" /><circle cx="280" cy="50" r="4.5" opacity="0.85" />
        </g>
        <circle cx="170" cy="135" r="3" fill="rgb(251,146,60)">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="230" cy="230" r="3" fill="rgb(251,146,60)">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" begin="0.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="155" cy="305" r="2.5" fill="rgb(251,146,60)">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2.1s" begin="0.8s" repeatCount="indefinite" />
        </circle>
      </svg>
      <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-[10px] tracking-[0.2em] text-muted-foreground/70 uppercase">
        Neural network
      </p>
    </div>
  );
}
