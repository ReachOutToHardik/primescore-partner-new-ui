"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldAlert, X } from "lucide-react";

/** Withdraw button + bottom sheet. Blocks withdrawal until KYC is done. */
export function WithdrawButton({ balance, kycDone }: { balance: number; kycDone: boolean }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [sent, setSent] = useState(false);
  const value = Number(amount) || 0;
  const error = value > balance ? "More than your available balance" : value > 0 && value < 100 ? "Minimum withdrawal is ₹100" : "";

  return (
    <>
      <button onClick={() => setOpen(true)} className="pressable mt-4 rounded-md bg-white px-5 py-2.5 text-sm font-medium text-brand-700">
        Withdraw
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/40 md:items-center md:justify-center" onClick={() => setOpen(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full animate-rise rounded-t-lg bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-ink md:max-w-md md:rounded-lg md:pb-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">Withdraw to bank</h2>
              <button aria-label="Close" onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-surface">
                <X className="h-4 w-4" />
              </button>
            </div>

            {!kycDone ? (
              <div className="mt-4">
                <div className="flex gap-3 rounded-md bg-amber-50 p-3.5 text-sm text-amber-800">
                  <ShieldAlert className="h-5 w-5 shrink-0" />
                  Complete your KYC (PAN and bank account) before you can withdraw.
                </div>
                <Link href="/kyc" className="pressable mt-4 block rounded-md bg-brand-700 py-3 text-center text-sm font-medium text-white">
                  Complete KYC
                </Link>
              </div>
            ) : sent ? (
              <p className="mt-4 text-sm text-ink">Withdrawal requested. It reaches your bank within 1 working day.</p>
            ) : (
              <div className="mt-4">
                <p className="text-sm text-muted">Available: ₹{balance.toLocaleString("en-IN")}</p>
                <input
                  inputMode="numeric"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter amount"
                  className="mt-2 w-full rounded-md border border-line px-3.5 py-3 text-base outline-none focus:border-brand-400"
                />
                {error && <p className="mt-1 text-xs text-score-red">{error}</p>}
                <button
                  disabled={!value || !!error}
                  onClick={() => setSent(true)}
                  className="pressable mt-4 w-full rounded-md bg-brand-700 py-3 text-sm font-medium text-white disabled:opacity-40"
                >
                  Withdraw
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
