import { useId } from "react";
import { FlatGauge } from "./rich-bg";

export type ArtKind = "card" | "cash" | "score" | "business";

/** Small dimensional product illustrations for product cards. */
export function ProductArt({ kind, className = "h-20 w-auto" }: { kind: ArtKind; className?: string }) {
  switch (kind) {
    case "card":
      return <CardArt className={className} />;
    case "cash":
      return <CashArt className={className} />;
    case "business":
      return <BuildingArt className={className} />;
    case "score":
      return <FlatGauge className={`text-brand-700 ${className}`} />;
  }
}

function CardArt({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 140 96" className={className} aria-hidden>
      <defs>
        <linearGradient id={`b${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2fae7a" />
          <stop offset="1" stopColor="#0f5b46" />
        </linearGradient>
        <linearGradient id={`f${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4a52c4" />
          <stop offset="0.55" stopColor="#262a6b" />
          <stop offset="1" stopColor="#11133a" />
        </linearGradient>
        <linearGradient id={`sheen${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`chip${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffe9a3" />
          <stop offset="0.5" stopColor="#d9a83a" />
          <stop offset="1" stopColor="#f4d27a" />
        </linearGradient>
        <filter id={`s${id}`} x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#14163d" floodOpacity="0.35" />
        </filter>
        <clipPath id={`c${id}`}>
          <rect x="22" y="22" width="96" height="60" rx="8" />
        </clipPath>
      </defs>
      {/* back card */}
      <g>
        <g transform="rotate(10 90 50)" filter={`url(#s${id})`}>
          <rect x="34" y="12" width="96" height="60" rx="8" fill={`url(#b${id})`} />
        </g>
      </g>
      {/* front card */}
      <g>
      <g transform="rotate(-6 70 52)" filter={`url(#s${id})`}>
        <rect x="22" y="22" width="96" height="60" rx="8" fill={`url(#f${id})`} />
        <g clipPath={`url(#c${id})`}>
          <g>
            <rect x="10" y="10" width="40" height="90" fill={`url(#sheen${id})`} transform="rotate(25 30 55)" />
          </g>
          <circle cx="112" cy="26" r="26" fill="#fff" opacity="0.05" />
        </g>
        <rect x="31" y="38" width="15" height="11" rx="2.2" fill={`url(#chip${id})`} />
        <path d="M31 43.5h15M38.5 38v11" stroke="#a9781f" strokeWidth="0.7" />
        <g fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="1.3" strokeLinecap="round">
          <path d="M52 40.5a5 5 0 0 1 0 6" />
          <path d="M55 38.5a8.5 8.5 0 0 1 0 10" />
        </g>
        <text x="31" y="63" fill="#fff" fontSize="7.5" letterSpacing="1.4" fontFamily="ui-monospace, monospace" opacity="0.9">
          •••• •••• 4821
        </text>
        <text x="31" y="74" fill="#fff" fontSize="5" letterSpacing="1" opacity="0.6">PLATINUM</text>
        <g transform="translate(96 66)">
          <path d="M0 6 A6 6 0 0 1 3 1" stroke="#ED1C24" strokeWidth="2.2" fill="none" />
          <path d="M4 0.3 A6 6 0 0 1 9 0.3" stroke="#E8D90C" strokeWidth="2.2" fill="none" />
          <path d="M10 1 A6 6 0 0 1 13 6" stroke="#72BE44" strokeWidth="2.2" fill="none" />
        </g>
      </g>
      </g>
    </svg>
  );
}

function CashArt({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 140 96" className={className} aria-hidden>
      <defs>
        <linearGradient id={`n${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#bfe8b0" />
          <stop offset="1" stopColor="#5fae4a" />
        </linearGradient>
        <radialGradient id={`coin${id}`} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#fff3b8" />
          <stop offset="0.55" stopColor="#f2b934" />
          <stop offset="1" stopColor="#b97a12" />
        </radialGradient>
        <filter id={`s${id}`} x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#14163d" floodOpacity="0.3" />
        </filter>
      </defs>
      <g filter={`url(#s${id})`}>
        {/* note stack */}
        <g>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${14 + i * 3} ${44 - i * 7}) rotate(-8)`}>
            <rect width="80" height="40" rx="4" fill={`url(#n${id})`} stroke="#3f8f2a" strokeOpacity="0.35" />
            <rect x="5" y="5" width="70" height="30" rx="3" fill="none" stroke="#2f6e1f" strokeOpacity="0.35" strokeDasharray="2 2" />
            <circle cx="40" cy="20" r="9" fill="#fff" opacity="0.55" />
            <text x="40" y="24.5" textAnchor="middle" fontSize="12" fontWeight="700" fill="#2f6e1f">₹</text>
          </g>
        ))}
        </g>
        {/* coin stack */}
        <g>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <ellipse cx="108" cy={78 - i * 7} rx="18" ry="6" fill="#b97a12" />
            <ellipse cx="108" cy={75 - i * 7} rx="18" ry="6" fill={`url(#coin${id})`} />
          </g>
        ))}
        <text x="108" y="57" textAnchor="middle" fontSize="7" fontWeight="800" fill="#8a5a0c">₹</text>
        </g>
      </g>
    </svg>
  );
}

function BuildingArt({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 140 96" className={className} aria-hidden>
      <defs>
        <linearGradient id={`fr${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5f69c4" />
          <stop offset="1" stopColor="#262a6b" />
        </linearGradient>
        <linearGradient id={`sd${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3d47a6" />
          <stop offset="1" stopColor="#14163d" />
        </linearGradient>
        <filter id={`s${id}`} x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#14163d" floodOpacity="0.3" />
        </filter>
      </defs>
      <ellipse cx="70" cy="88" rx="48" ry="5" fill="#14163d" opacity="0.12" />
      <g filter={`url(#s${id})`}>
        {/* tall tower */}
        <path d="M52 14 L80 8 L80 86 L52 86 Z" fill={`url(#fr${id})`} />
        <path d="M80 8 L94 14 L94 86 L80 86 Z" fill={`url(#sd${id})`} />
        {Array.from({ length: 8 }).map((_, r) =>
          [0, 1, 2].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={56 + c * 8}
              y={20 + r * 8}
              width="5"
              height="4.5"
              rx="0.6"
              fill={(r + c) % 3 === 0 ? "#ffe58a" : "#a9b0f0"}
              opacity={(r + c) % 3 === 0 ? 0.95 : 0.55}
            />
          ))
        )}
        {/* low block */}
        <path d="M30 48 L52 44 L52 86 L30 86 Z" fill="#72BE44" />
        <path d="M94 54 L114 50 L114 86 L94 86 Z" fill="#E8D90C" opacity="0.9" />
        {Array.from({ length: 4 }).map((_, r) => (
          <rect key={r} x="35" y={54 + r * 8} width="12" height="4" rx="0.6" fill="#fff" opacity="0.5" />
        ))}
      </g>
    </svg>
  );
}
