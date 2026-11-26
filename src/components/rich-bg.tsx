import { useId } from "react";

/**
 * Layered "real" banner background: deep navy base, soft studio lighting,
 * a faint perspective grid and film grain so it doesn't read as a flat fill.
 */
export function RichBg() {
  const grain = `grain${useId().replace(/:/g, "")}`;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* base + lighting */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(90% 80% at 100% 0%, rgba(120,132,230,0.55) 0%, rgba(120,132,230,0) 55%)",
            "radial-gradient(70% 60% at 0% 100%, rgba(114,190,68,0.22) 0%, rgba(114,190,68,0) 60%)",
            "radial-gradient(60% 50% at 30% 0%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 60%)",
            "linear-gradient(155deg, #2e3488 0%, #232769 45%, #12143a 100%)",
          ].join(","),
        }}
      />
      {/* perspective grid fading out */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          transform: "perspective(320px) rotateX(58deg)",
          transformOrigin: "bottom",
          maskImage: "linear-gradient(to top, black 0%, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 85%)",
        }}
      />
      {/* top edge highlight, like light hitting a card */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      {/* film grain */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.16] mix-blend-overlay">
        <filter id={grain}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${grain})`} />
      </svg>
    </div>
  );
}

const pivot: React.CSSProperties = { transformBox: "view-box", transformOrigin: "80px 80px" };

/**
 * Flat score gauge in the logo's style: three solid arcs with clean gaps
 * and a tapered needle. The needle uses currentColor, so set a text colour
 * on the parent (white on navy, brand navy on light backgrounds).
 */
export function FlatGauge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 92" className={className} aria-hidden>
      <g fill="none" strokeWidth="14">
        <path d="M23 80 A57 57 0 0 1 38.7 40.7" stroke="#ED1C24" />
        <path d="M45.5 34.5 A57 57 0 0 1 114.5 34.5" stroke="#E8D90C" />
        <path d="M121.3 40.7 A57 57 0 0 1 137 80" stroke="#72BE44" />
      </g>
      {/* needle pointing into the green; sweeps up once on load */}
      <g transform="rotate(-38 80 80)">
        <g className="animate-needle-sweep" style={pivot}>
          <path d="M80 75 L124 79 Q126 80 124 81 L80 85 Z" fill="currentColor" />
        </g>
      </g>
      <circle cx="80" cy="80" r="8" fill="currentColor" />
    </svg>
  );
}
