"use client";

import { useEffect, useState } from "react";
import { Download, Share, X } from "lucide-react";
import { BrandMark } from "./brand";

type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

const DISMISS_KEY = "ps-install-dismissed";

/**
 * Registers the service worker and shows an "Install app" sheet:
 * - Android / desktop Chrome: uses the native beforeinstallprompt.
 * - iOS Safari: shows the "Share → Add to Home Screen" hint.
 */
export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [ios, setIos] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      if (process.env.NODE_ENV === "production") {
        navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" }).catch(() => {});
      } else {
        // In dev, a worker left over from a production run would serve stale chunks: remove it and its caches.
        navigator.serviceWorker.getRegistrations().then((regs) => regs.forEach((r) => r.unregister()));
        if ("caches" in window) caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
      }
    }

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(DISMISS_KEY) === "1";
    } catch {}
    if (standalone || dismissed) return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
      setOpen(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);

    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
    if (isIos) {
      const t = setTimeout(() => {
        setIos(true);
        setOpen(true);
      }, 2500);
      return () => {
        clearTimeout(t);
        window.removeEventListener("beforeinstallprompt", onPrompt);
      };
    }
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  function close() {
    setOpen(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {}
  }

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-x-3 bottom-24 z-50 animate-pop md:right-6 md:bottom-6 md:left-auto md:w-96">
      <div className="flex items-center gap-3 rounded-lg bg-brand-900 p-3.5 text-white shadow-lift ring-1 ring-white/10">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-white">
          <BrandMark className="h-8 w-auto" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-base font-semibold">Install PrimeScore Partner</p>
          {ios ? (
            <p className="text-xs text-white/70">
              Tap <Share className="inline h-3.5 w-3.5 -translate-y-px" /> then &ldquo;Add to Home Screen&rdquo;
            </p>
          ) : (
            <p className="text-xs text-white/70">Faster access, works like an app</p>
          )}
        </div>
        {!ios && (
          <button
            onClick={install}
            className="pressable inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm font-medium text-brand-700"
          >
            <Download className="h-4 w-4" /> Install
          </button>
        )}
        <button onClick={close} aria-label="Dismiss" className="grid h-8 w-8 place-items-center rounded-full text-white/60 hover:bg-white/10">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
