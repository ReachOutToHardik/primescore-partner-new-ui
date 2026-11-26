"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const field = "w-full rounded-md border border-line bg-white px-3.5 py-3 text-base text-ink outline-none focus:border-brand-400";

/** Mobile + OTP login. Mock: any 6-digit OTP works until the API is connected. */
export function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  function sendOtp(e?: React.FormEvent) {
    e?.preventDefault();
    if (!/^[6-9]\d{9}$/.test(mobile)) return setError("Enter a valid 10-digit mobile number");
    setError("");
    setStep("otp");
    setTimer(30);
  }

  function verify(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp)) return setError("Enter the 6-digit OTP");
    router.push("/");
  }

  if (step === "phone") {
    return (
      <form onSubmit={sendOtp} noValidate className="mt-8 flex flex-1 flex-col">
        <label htmlFor="mobile" className="mb-1.5 text-sm font-medium text-ink">
          Mobile number
        </label>
        <div className="flex">
          <span className="grid place-items-center rounded-l-md border border-r-0 border-line bg-surface px-3 text-sm text-muted">+91</span>
          <input
            id="mobile"
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={10}
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
            className={`${field} rounded-l-none`}
            placeholder="10-digit number"
          />
        </div>
        {error && <p className="mt-1 text-xs text-score-red">{error}</p>}
        <div className="mt-auto pt-8 md:mt-8">
          <button type="submit" className="pressable w-full rounded-md bg-brand-700 py-3 text-sm font-medium text-white">
            Get OTP
          </button>
          <p className="mt-4 text-center text-xs text-muted">
            By continuing you agree to PrimeScore&apos;s Partner Terms and Privacy Policy.
          </p>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={verify} noValidate className="mt-8 flex flex-1 flex-col">
      <label htmlFor="otp" className="mb-1.5 text-sm font-medium text-ink">
        OTP sent to +91 {mobile}{" "}
        <button type="button" onClick={() => { setStep("phone"); setOtp(""); }} className="font-medium text-brand-600">
          Change
        </button>
      </label>
      <input
        id="otp"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
        className={`${field} text-center text-xl tracking-[0.5em]`}
        placeholder="••••••"
        autoFocus
      />
      {error && <p className="mt-1 text-xs text-score-red">{error}</p>}
      <p className="mt-3 text-sm text-muted">
        {timer > 0 ? (
          <>Resend OTP in {timer}s</>
        ) : (
          <button type="button" onClick={() => sendOtp()} className="font-medium text-brand-600">
            Resend OTP
          </button>
        )}
      </p>
      <div className="mt-auto pt-8 md:mt-8">
        <button type="submit" className="pressable w-full rounded-md bg-brand-700 py-3 text-sm font-medium text-white">
          Verify and log in
        </button>
      </div>
    </form>
  );
}
