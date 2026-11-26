"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  CircleHelp,
  CircleUserRound,
  GraduationCap,
  House,
  Languages,
  LayoutGrid,
  Plus,
  Search,
  ShieldCheck,
  UsersRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { BrandMark, Coin, Logo } from "./brand";
import { Avatar } from "./ui";
import { partner } from "@/lib/data";
import { InstallPrompt } from "./install-prompt";
import { HelpFab } from "./help-fab";

type NavItem = { href: string; label: string; icon: LucideIcon };

const nav: NavItem[] = [
  { href: "/", label: "Home", icon: House },
  { href: "/leads", label: "Leads", icon: UsersRound },
  { href: "/sell", label: "Sell", icon: LayoutGrid },
  { href: "/learn", label: "Learn", icon: GraduationCap },
  { href: "/account", label: "Account", icon: CircleUserRound },
];

const sideNav: { title: string; items: (NavItem & { badge?: number })[] }[] = [
  {
    title: "Work",
    items: [
      { href: "/", label: "Home", icon: House },
      { href: "/leads", label: "Leads", icon: UsersRound },
      { href: "/sell", label: "Sell & Earn", icon: LayoutGrid },
      { href: "/learn", label: "Learn", icon: GraduationCap },
    ],
  },
  {
    title: "Money",
    items: [{ href: "/earnings", label: "Earnings", icon: Wallet }],
  },
  {
    title: "You",
    items: [
      { href: "/notifications", label: "Notifications", icon: Bell, badge: 2 },
      { href: "/kyc", label: "KYC", icon: ShieldCheck },
      { href: "/account", label: "Account", icon: CircleUserRound },
    ],
  },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Full-screen pages without the app chrome
  if (pathname.startsWith("/login")) return <>{children}</>;

  return (
    <div className="min-h-dvh md:flex">
      {/* ---------- Desktop sidebar ---------- */}
      <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-line bg-white md:flex">
        <div className="px-5 pt-5 pb-4">
          {/* Logo · divider · "Partner Portal", reads as one lockup */}
          <Link href="/" aria-label="PrimeScore Partner Portal" className="flex items-center gap-3">
            <Logo className="h-10 w-auto" priority />
            <span className="h-8 w-px bg-line" />
            <span className="text-[13px] leading-[1.1] font-semibold text-brand-700">
              Partner
              <br />
              Portal
            </span>
          </Link>
        </div>

        <div className="px-3">
          <Link
            href="/leads/new?product=credit-rectification"
            className="flex items-center justify-center gap-1.5 rounded-md bg-brand-700 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
          >
            <Plus className="h-4 w-4" /> Add case
          </Link>
        </div>

        <nav className="mt-4 flex-1 space-y-5 overflow-y-auto px-3">
          {sideNav.map((group) => (
            <div key={group.title}>
              <p className="px-3 pb-1.5 text-[11px] font-semibold tracking-wider text-muted uppercase">{group.title}</p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(pathname, item.href);
                  const I = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        active ? "bg-brand-50 text-brand-700" : "text-ink/70 hover:bg-surface hover:text-ink"
                      }`}
                    >
                      {active && <span className="absolute inset-y-1.5 left-0 w-[3px] rounded-r bg-brand-700" />}
                      <I className="h-[18px] w-[18px]" strokeWidth={active ? 2.2 : 1.8} />
                      {item.label}
                      {item.badge ? (
                        <span className="ml-auto rounded bg-score-red px-1.5 text-[11px] font-semibold text-white">{item.badge}</span>
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <Link href="/earnings" className="flex items-center gap-3 border-t border-line px-5 py-4 hover:bg-surface">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-brand-700">
            <Wallet className="h-[18px] w-[18px]" />
          </span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block text-xs text-muted">Wallet</span>
            <span className="block text-sm font-semibold text-ink">₹{partner.wallet.toLocaleString("en-IN")}</span>
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-ink">
            <Coin className="h-4 w-4" /> {partner.coins}
          </span>
        </Link>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* ---------- Desktop top bar ---------- */}
        <header className="sticky top-0 z-30 hidden h-14 items-center gap-4 border-b border-line bg-white/90 px-8 backdrop-blur-md md:flex">
          <label className="flex w-full max-w-sm items-center gap-2 rounded-md bg-surface px-3 py-2 text-sm text-muted focus-within:ring-1 focus-within:ring-brand-300">
            <Search className="h-4 w-4" />
            <input className="w-full bg-transparent outline-none placeholder:text-muted" placeholder="Search leads, products, trainings" />
          </label>
          <div className="ml-auto flex items-center gap-1">
            <IconButton label="Language"><Languages className="h-[18px] w-[18px]" /></IconButton>
            <IconButton label="Help"><CircleHelp className="h-[18px] w-[18px]" /></IconButton>
            <IconButton label="Notifications" dot href="/notifications"><Bell className="h-[18px] w-[18px]" /></IconButton>
            <span className="mx-2 h-6 w-px bg-line" />
            <Link href="/account" className="flex items-center gap-2.5 rounded-md py-1 pr-2 pl-1 hover:bg-surface">
              <Avatar name={partner.name} className="h-8 w-8 text-xs" />
              <span className="text-left leading-tight">
                <span className="block text-sm font-medium text-ink">{partner.name}</span>
                <span className="block text-[11px] text-muted">{partner.code}</span>
              </span>
            </Link>
          </div>
        </header>

        <main className="flex-1 pb-28 md:px-8 md:pt-6 md:pb-12">
          <div className="mx-auto w-full max-w-[1200px]">{children}</div>
        </main>
      </div>

      <InstallPrompt />
      <HelpFab />

      {/* ---------- Mobile bottom tab bar ---------- */}
      <nav className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur-md md:hidden">
        <ul className="mx-auto grid max-w-lg grid-cols-5">
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            const I = item.icon;
            if (item.href === "/sell") {
              return (
                <li key={item.href} className="relative flex justify-center">
                  <Link href={item.href} className="-mt-6 flex flex-col items-center gap-1" aria-label="Sell and earn">
                    <span
                      className={`grid h-15 w-15 place-items-center rounded-full bg-brand-700 text-white shadow-lift ring-4 ring-white transition-transform active:scale-95 ${
                        active ? "scale-105" : ""
                      }`}
                    >
                      <BrandMark className="h-8 w-auto" mono needle />
                    </span>
                    <span className={`text-[11px] font-semibold ${active ? "text-brand-700" : "text-muted"}`}>Sell</span>
                  </Link>
                </li>
              );
            }
            return (
              <li key={item.href}>
                <Link href={item.href} className="relative flex flex-col items-center gap-1 pt-2.5 pb-2">
                  {active && <span className="absolute top-0 h-[3px] w-8 rounded-b-full bg-brand-700" />}
                  <I className={`h-6 w-6 ${active ? "text-brand-700" : "text-muted"}`} strokeWidth={active ? 2.3 : 1.8} />
                  <span className={`text-[11px] ${active ? "font-semibold text-brand-700" : "font-medium text-muted"}`}>
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export function IconButton({
  children,
  label,
  dot,
  light,
  href = "/soon",
}: {
  children: React.ReactNode;
  label: string;
  dot?: boolean;
  light?: boolean;
  href?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`pressable relative grid h-10 w-10 place-items-center rounded-full ${
        light ? "text-white hover:bg-white/10 md:text-ink/80 md:hover:bg-surface" : "text-ink/80 hover:bg-surface"
      }`}
    >
      {children}
      {dot && <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-score-red ring-2 ring-white" />}
    </Link>
  );
}

/** Mobile-only app bar used on the Home tab (greeting + quick actions). */
export function HomeAppBar() {
  return (
    <header className="pt-safe sticky top-0 z-30 bg-white/95 backdrop-blur-md md:hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        <Link href="/account">
          <Avatar name={partner.name} />
        </Link>
        <div className="leading-tight">
          <p className="text-xs text-muted">Hello 👋</p>
          <p className="text-xl font-semibold">{partner.firstName}</p>
        </div>
        <div className="ml-auto flex items-center">
          <IconButton label="Language"><Languages className="h-5.5 w-5.5" /></IconButton>
          <IconButton label="Help"><CircleHelp className="h-5.5 w-5.5" /></IconButton>
          <IconButton label="Notifications" dot href="/notifications"><Bell className="h-5.5 w-5.5" /></IconButton>
        </div>
      </div>
    </header>
  );
}

/** Coloured page header for mobile tabs; becomes a plain title on desktop. */
export function PageHeader({
  title,
  subtitle,
  actions,
  tone = "brand",
  children,
  overlap,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  tone?: "brand" | "dark";
  children?: React.ReactNode;
  /** Extra bottom space so a white card can overlap the header edge. */
  overlap?: boolean;
}) {
  const bg = tone === "dark" ? "bg-brand-900" : "bg-brand-700";
  return (
    <header className={`pt-safe ${bg} text-white md:bg-transparent md:text-ink`}>
      <div className={`flex items-center gap-3 px-4 pt-4 md:px-0 md:pt-0 ${overlap ? "pb-14" : "pb-5"}`}>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl leading-tight font-semibold md:text-2xl">{title}</h1>
          {subtitle && <p className="mt-0.5 text-sm text-white/65 md:text-muted">{subtitle}</p>}
        </div>
        {actions}
      </div>
      {children}
    </header>
  );
}
