import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  ChevronRight,
  CircleHelp,
  FileText,
  Gauge,
  Gift,
  Globe,
  IdCard,
  Landmark,
  Languages,
  LogOut,
  MessageSquareText,
  Network,
  ShieldCheck,
  Trophy,
  Wallet,
} from "lucide-react";
import { Logo, Coin } from "@/components/brand";
import { SocialIcon } from "@/components/icons";
import { Avatar, ListRow } from "@/components/ui";
import { partner } from "@/lib/data";

export const metadata: Metadata = { title: "Account" };

const band = "border-y border-line bg-white md:rounded-lg md:border";

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={band}>
      <h2 className="px-4 pt-4 pb-1 text-xs font-semibold tracking-wide text-muted uppercase">{title}</h2>
      <div className="divide-y divide-line">{children}</div>
    </section>
  );
}

export default function AccountPage() {
  return (
    <div>
      <div className="mb-6 hidden md:block">
        <h1 className="text-2xl font-semibold text-ink">Account</h1>
        <p className="text-sm text-muted">Your profile, payouts and settings</p>
      </div>

      <div className="md:grid md:grid-cols-12 md:items-start md:gap-6">
      {/* profile: top band on phones, sticky card on desktop */}
      <header className="pt-safe relative bg-brand-700 text-white md:sticky md:top-20 md:col-span-4 md:overflow-hidden md:rounded-lg md:pt-0">
        <div className="flex items-center gap-4 px-4 pt-5 pb-5 md:flex-col md:items-start md:gap-3 md:px-5 md:py-6">
          <Avatar name={partner.name} className="h-14 w-14 bg-white/15 text-lg text-white md:h-16 md:w-16" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <p className="text-xl leading-tight font-semibold">{partner.name}</p>
              <span className="inline-flex items-center gap-1 rounded bg-white/15 px-1.5 py-0.5 text-[11px] font-semibold">
                <BadgeCheck className="h-3.5 w-3.5" /> {partner.tier.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-white/70">
              {partner.phone} · {partner.code}
            </p>
          </div>
          <Link href="/soon" className="shrink-0 text-sm font-medium text-white/90 md:absolute md:top-5 md:right-5">
            Edit <ChevronRight className="inline h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-3 divide-x divide-white/15 border-t border-white/15">
          <Link href="/earnings" className="px-4 py-3">
            <p className="flex items-center gap-1 text-[11px] text-white/60"><Wallet className="h-3.5 w-3.5" /> Wallet</p>
            <p className="text-base font-semibold">₹{partner.wallet}</p>
          </Link>
          <Link href="/earnings" className="px-4 py-3">
            <p className="flex items-center gap-1 text-[11px] text-white/60"><Coin className="h-3.5 w-3.5" /> Coins</p>
            <p className="text-base font-semibold">{partner.coins}</p>
          </Link>
          <Link href="/soon" className="px-4 py-3">
            <p className="flex items-center gap-1 text-[11px] text-white/60"><Trophy className="h-3.5 w-3.5" /> Rank</p>
            <p className="text-base font-semibold">#{partner.rank}</p>
          </Link>
        </div>
      </header>

      <div className="mt-2 grid gap-2 md:col-span-8 md:mt-0 md:grid-cols-2 md:gap-6">
        <div className="space-y-2 md:space-y-6">
          <section className={band}>
            <div className="divide-y divide-line">
              <ListRow icon={<Gift className="h-5 w-5" />} label="Refer & earn up to ₹1,000" />
              <ListRow icon={<CircleHelp className="h-5 w-5" />} label="Help & support" />
            </div>
          </section>

          <Group title="My business">
            <ListRow icon={<Network className="h-5 w-5" />} label="Manage your team" />
            <ListRow icon={<Gauge className="h-5 w-5" />} label="Free credit score" href="/sell/credit-report" />
            <ListRow icon={<Globe className="h-5 w-5" />} label="My website" />
            <ListRow icon={<IdCard className="h-5 w-5" />} label="Visiting card" />
          </Group>

          <section className={`${band} px-4 py-4`}>
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">Follow us</p>
            <div className="mt-3 flex justify-between">
              <SocialIcon kind="youtube" />
              <SocialIcon kind="facebook" />
              <SocialIcon kind="whatsapp" />
              <SocialIcon kind="instagram" />
              <SocialIcon kind="telegram" />
            </div>
          </section>
        </div>

        <div className="space-y-2 md:space-y-6">
          <Group title="Payouts & KYC">
            <ListRow icon={<Landmark className="h-5 w-5" />} label="Bank account" href="/kyc" value="Add" />
            <ListRow icon={<ShieldCheck className="h-5 w-5" />} label="KYC & documents" href="/kyc" value={<span className="font-medium text-amber-600">Pending</span>} />
            <ListRow icon={<FileText className="h-5 w-5" />} label="Payout statements" href="/earnings" />
          </Group>

          <Group title="Settings">
            <ListRow icon={<MessageSquareText className="h-5 w-5" />} label="Communications" href="/notifications" />
            <ListRow icon={<Languages className="h-5 w-5" />} label="Change language" value="English" />
          </Group>

          <Group title="More">
            <ListRow icon={<FileText className="h-5 w-5" />} label="Terms & Conditions" />
            <ListRow icon={<ShieldCheck className="h-5 w-5" />} label="Privacy Policy" />
            <ListRow icon={<LogOut className="h-5 w-5" />} label="Log out" href="/login" danger />
          </Group>
        </div>
      </div>

      </div>

      <div className="flex flex-col items-center pt-6 pb-8 opacity-60 grayscale">
        <Logo className="h-10 w-auto" />
        <p className="mt-2 text-xs text-muted">v 1.0.0</p>
      </div>
    </div>
  );
}
