import { WifiOff } from "lucide-react";
import { BrandMark } from "@/components/brand";

export const metadata = { title: "Offline" };

export default function OfflinePage() {
  return (
    <div className="flex min-h-[70dvh] flex-col items-center justify-center px-6 text-center">
      <BrandMark className="h-20 w-auto" />
      <WifiOff className="mt-6 h-8 w-8 text-muted" />
      <h1 className="mt-3 text-2xl font-semibold">You&apos;re offline</h1>
      <p className="mt-1 max-w-xs text-muted">Check your internet connection. Your leads and earnings will load once you&apos;re back online.</p>
    </div>
  );
}
