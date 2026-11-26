import {
  BadgeCheck,
  Briefcase,
  Building2,
  Calculator,
  Car,
  ChartNoAxesCombined,
  Contact,
  CreditCard,
  Gauge,
  Gem,
  Globe,
  HandCoins,
  HeartPulse,
  House,
  Landmark,
  Megaphone,
  ShieldCheck,
  TrendingUp,
  Zap,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  BadgeCheck,
  Briefcase,
  Building2,
  Calculator,
  Car,
  ChartNoAxesCombined,
  Contact,
  CreditCard,
  Gauge,
  Gem,
  Globe,
  HandCoins,
  HeartPulse,
  House,
  Landmark,
  Megaphone,
  ShieldCheck,
  TrendingUp,
  Zap,
};

/** Each icon gets a motion that matches what it represents. */
const motion: Record<string, string> = {
  BadgeCheck: "animate-wiggle",
  Briefcase: "animate-sway",
  Building2: "animate-float",
  Calculator: "animate-bob",
  Car: "animate-drive",
  ChartNoAxesCombined: "animate-nudge",
  Contact: "animate-sway",
  CreditCard: "animate-tilt",
  Gauge: "animate-wiggle",
  Gem: "animate-flash",
  Globe: "animate-sway",
  HandCoins: "animate-bob",
  HeartPulse: "animate-heartbeat",
  House: "animate-bob",
  Landmark: "animate-float",
  Megaphone: "animate-wiggle",
  ShieldCheck: "animate-heartbeat",
  TrendingUp: "animate-nudge",
  Zap: "animate-flash",
};

export function Icon({
  name,
  className,
  animate = false,
  delay = 0,
}: {
  name: string;
  className?: string;
  /** Loop a small icon-specific motion (off for users with reduced motion). */
  animate?: boolean;
  /** Seconds; stagger neighbours so a grid doesn't move in lockstep. */
  delay?: number;
}) {
  const C = map[name] ?? Gauge;
  if (!animate) return <C className={className} strokeWidth={1.9} />;
  return (
    <span className={`inline-flex ${motion[name] ?? "animate-float"}`} style={{ animationDelay: `${-delay}s` }}>
      <C className={className} strokeWidth={1.9} />
    </span>
  );
}

/* Brand glyphs (lucide no longer ships these). Simple, recognisable shapes. */
export function SocialIcon({ kind }: { kind: "youtube" | "facebook" | "whatsapp" | "instagram" | "telegram" }) {
  const common = "h-11 w-11 rounded-full grid place-items-center text-white shadow-card pressable";
  switch (kind) {
    case "youtube":
      return (
        <span className={`${common} bg-[#E62117]`}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M9 7.5v9l7.5-4.5z" /></svg>
        </span>
      );
    case "facebook":
      return (
        <span className={`${common} bg-[#3B5998]`}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21z" /></svg>
        </span>
      );
    case "whatsapp":
      return (
        <span className={`${common} bg-[#25D366]`}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4.5 19.5l1.1-3.6A7.8 7.8 0 1 1 8.4 18.6z" strokeLinejoin="round" /><path d="M9.2 9.1c.3 1.9 1.9 3.6 3.9 4.2l.9-1 1.6.7c-.2 1-.9 1.5-1.8 1.4-2.8-.3-5.1-2.6-5.4-5.4 0-.9.5-1.6 1.4-1.8l.7 1.6z" fill="currentColor" stroke="none" /></svg>
        </span>
      );
    case "instagram":
      return (
        <span className={`${common} bg-gradient-to-tr from-[#F9A825] via-[#E1306C] to-[#833AB4]`}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.6" /><circle cx="16.9" cy="7.1" r="0.6" fill="currentColor" /></svg>
        </span>
      );
    case "telegram":
      return (
        <span className={`${common} bg-[#229ED9]`}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M20.5 4.5L3.6 11c-.9.4-.9 1.4 0 1.7l4.2 1.3 1.6 5c.2.6 1 .8 1.4.3l2.3-2.3 4.4 3.2c.6.4 1.3.1 1.5-.6l2.8-13.2c.2-.8-.6-1.4-1.3-1zM9.6 14.2l7.6-6.8-6.2 7.8-.3 2.8z" /></svg>
        </span>
      );
  }
}
