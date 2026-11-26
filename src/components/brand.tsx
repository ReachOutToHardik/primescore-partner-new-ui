import Image from "next/image";

/** The gauge-"P" mark from the PrimeScore logo, as crisp inline SVG. */
export function BrandMark({
  className,
  mono,
  needle = true,
}: {
  className?: string;
  /** Draw the navy parts in currentColor (for use on dark backgrounds). */
  mono?: boolean;
  needle?: boolean;
}) {
  const navy = mono ? "currentColor" : "#262A6B";
  return (
    <svg viewBox="130 0 680 760" className={className} aria-hidden>
      <g fill="none" strokeWidth="106">
        <path d="M207 297.3 A260 260 0 0 1 275.8 142.7" stroke="#ED1C24" />
        <path d="M298.9 120.8 A260 260 0 0 1 633.1 120.8" stroke="#E8D90C" />
        <path d="M656.2 142.7 A260 260 0 0 1 725 297.3" stroke="#72BE44" />
        <path d="M725 342.7 A260 260 0 0 1 207 342.7" stroke={navy} />
      </g>
      <rect x="153" y="340" width="107" height="410" fill={navy} />
      {needle && (
        <g fill={navy}>
          <path d="M440 300 L582 256 Q596 254 590 268 L478 344 Q452 360 438 336 Q428 312 440 300Z" />
        </g>
      )}
    </svg>
  );
}

/** Full logo (mark + wordmark). Uses the official artwork. */
export function Logo({
  variant = "color",
  className,
  priority,
}: {
  variant?: "color" | "white";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={variant === "white" ? "/brand/logo-white.webp" : "/brand/logo.webp"}
      alt="PrimeScore"
      width={2000}
      height={772}
      priority={priority}
      className={className}
    />
  );
}

/** Small "PrimeScore" lockup built from the mark + live text (scales nicely). */
export function Lockup({ className, light }: { className?: string; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <BrandMark className="h-7 w-auto" mono={light} />
      <span
        className={`text-base leading-[0.95] font-bold tracking-tight ${
          light ? "text-white" : "text-brand-700"
        }`}
      >
        Prime
        <br />
        Score
      </span>
    </span>
  );
}

/** Mini semicircle score gauge, used across cards. */
export function ScoreGauge({ value = 742, className }: { value?: number; className?: string }) {
  // value 300–900 → angle 180°..0°
  const t = Math.min(1, Math.max(0, (value - 300) / 600));
  const angle = Math.PI * (1 - t);
  const nx = 60 + 38 * Math.cos(angle);
  const ny = 60 - 38 * Math.sin(angle);
  return (
    <svg viewBox="0 0 120 70" className={className} aria-hidden>
      <g fill="none" strokeWidth="11" strokeLinecap="butt">
        <path d="M12 60 A48 48 0 0 1 26 26" stroke="#ED1C24" />
        <path d="M30 22 A48 48 0 0 1 90 22" stroke="#E8D90C" />
        <path d="M94 26 A48 48 0 0 1 108 60" stroke="#72BE44" />
      </g>
      <line x1="60" y1="60" x2={nx} y2={ny} stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <circle cx="60" cy="60" r="7" fill="currentColor" />
    </svg>
  );
}

/** "Prime Coins" token, PrimeScore's in-app reward currency. */
export function Coin({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <span
      className={`inline-grid place-items-center rounded-full bg-gradient-to-br from-[#FFD84D] to-[#F5A524] text-[10px] font-extrabold text-brand-800 ring-2 ring-[#FFE58A]/70 ${className}`}
      aria-label="Prime Coins"
    >
      P
    </span>
  );
}
