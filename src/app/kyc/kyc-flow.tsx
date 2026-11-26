"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, CircleCheck } from "lucide-react";

const steps = ["PAN", "Aadhaar", "Bank account", "Agreement"] as const;
const field = "w-full rounded-md border border-line bg-white px-3.5 py-3 text-base text-ink outline-none focus:border-brand-400";
const labelCls = "mb-1.5 block text-sm font-medium text-ink";

/** 4-step partner KYC. Mock: validates format only, nothing is sent anywhere yet. */
export function KycFlow() {
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [f, setF] = useState({ pan: "", panName: "", aadhaar: "", account: "", account2: "", ifsc: "", holder: "", agree: false });
  const set = (k: keyof typeof f, v: string | boolean) => setF((s) => ({ ...s, [k]: v }));

  function next(e: React.FormEvent) {
    e.preventDefault();
    let err = "";
    if (step === 0) {
      if (!/^[A-Z]{5}\d{4}[A-Z]$/.test(f.pan)) err = "Enter a valid PAN (e.g. ABCDE1234F)";
      else if (f.panName.trim().length < 2) err = "Enter your name as on PAN";
    } else if (step === 1) {
      if (!/^\d{12}$/.test(f.aadhaar)) err = "Enter your 12-digit Aadhaar number";
    } else if (step === 2) {
      if (!/^\d{9,18}$/.test(f.account)) err = "Enter a valid account number";
      else if (f.account !== f.account2) err = "Account numbers don't match";
      else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(f.ifsc)) err = "Enter a valid IFSC (e.g. HDFC0001234)";
    } else if (step === 3) {
      if (!f.agree) err = "Please accept the partner agreement";
    }
    setError(err);
    if (!err) setStep((s) => s + 1);
  }

  if (step >= steps.length) {
    return (
      <div className="flex flex-col items-center border-b border-line bg-white px-6 py-12 text-center md:rounded-lg md:border">
        <CircleCheck className="h-14 w-14 text-score-green-dark" strokeWidth={1.5} />
        <h2 className="mt-3 text-xl font-semibold text-ink">KYC submitted</h2>
        <p className="mt-1 max-w-xs text-sm text-muted">We&apos;ll verify your details within 24 hours. Payouts start once it&apos;s approved.</p>
        <Link href="/" className="pressable mt-6 w-full max-w-xs rounded-md bg-brand-700 py-3 text-sm font-medium text-white">
          Go to home
        </Link>
      </div>
    );
  }

  return (
    <div className="border-b border-line bg-white md:rounded-lg md:border">
      {/* stepper */}
      <ol className="grid grid-cols-4 gap-1 border-b border-line px-4 py-3">
        {steps.map((s, i) => (
          <li key={s}>
            <div className={`h-1 rounded-full ${i < step ? "bg-score-green" : i === step ? "bg-brand-700" : "bg-line"}`} />
            <p className={`mt-1.5 flex items-center gap-0.5 text-[11px] ${i <= step ? "text-ink" : "text-muted"}`}>
              {i < step && <Check className="h-3 w-3 text-score-green-dark" strokeWidth={3} />}
              {s}
            </p>
          </li>
        ))}
      </ol>

      <form onSubmit={next} noValidate className="space-y-5 px-4 py-5 md:p-6">
        {step === 0 && (
          <>
            <div>
              <label className={labelCls} htmlFor="pan">PAN number</label>
              <input id="pan" maxLength={10} value={f.pan} onChange={(e) => set("pan", e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))} className={`${field} uppercase`} placeholder="ABCDE1234F" />
            </div>
            <div>
              <label className={labelCls} htmlFor="panName">Name as on PAN</label>
              <input id="panName" value={f.panName} onChange={(e) => set("panName", e.target.value)} className={field} />
            </div>
          </>
        )}
        {step === 1 && (
          <div>
            <label className={labelCls} htmlFor="aadhaar">Aadhaar number</label>
            <input id="aadhaar" inputMode="numeric" maxLength={12} value={f.aadhaar} onChange={(e) => set("aadhaar", e.target.value.replace(/\D/g, ""))} className={field} placeholder="12-digit number" />
            <p className="mt-1.5 text-xs text-muted">We&apos;ll send an OTP to the mobile linked with your Aadhaar.</p>
          </div>
        )}
        {step === 2 && (
          <>
            <div>
              <label className={labelCls} htmlFor="holder">Account holder name</label>
              <input id="holder" value={f.holder} onChange={(e) => set("holder", e.target.value)} className={field} />
            </div>
            <div>
              <label className={labelCls} htmlFor="account">Account number</label>
              <input id="account" inputMode="numeric" value={f.account} onChange={(e) => set("account", e.target.value.replace(/\D/g, ""))} className={field} />
            </div>
            <div>
              <label className={labelCls} htmlFor="account2">Re-enter account number</label>
              <input id="account2" inputMode="numeric" value={f.account2} onChange={(e) => set("account2", e.target.value.replace(/\D/g, ""))} className={field} />
            </div>
            <div>
              <label className={labelCls} htmlFor="ifsc">IFSC code</label>
              <input id="ifsc" maxLength={11} value={f.ifsc} onChange={(e) => set("ifsc", e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))} className={`${field} uppercase`} placeholder="HDFC0001234" />
            </div>
          </>
        )}
        {step === 3 && (
          <label className="flex items-start gap-3 rounded-md bg-surface p-3.5">
            <input type="checkbox" checked={f.agree} onChange={(e) => set("agree", e.target.checked)} className="mt-0.5 h-4 w-4 accent-brand-700" />
            <span className="text-sm text-ink">
              I have read and accept the PrimeScore Partner Agreement, including payout terms and the code of conduct for handling customer data.
            </span>
          </label>
        )}

        {error && <p className="text-sm text-score-red">{error}</p>}

        <div className="flex gap-2">
          {step > 0 && (
            <button type="button" onClick={() => { setError(""); setStep((s) => s - 1); }} className="pressable flex-1 rounded-md border border-line py-3 text-sm font-medium text-brand-700">
              Back
            </button>
          )}
          <button type="submit" className="pressable flex-1 rounded-md bg-brand-700 py-3 text-sm font-medium text-white">
            {step === steps.length - 1 ? "Submit KYC" : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}
