import { Logo } from "@/components/brand";
import { LoginForm } from "./login-form";

export const metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <div className="pt-safe flex min-h-dvh flex-col bg-white md:items-center md:justify-center md:bg-surface">
      <div className="flex w-full flex-1 flex-col px-6 pt-10 pb-8 md:max-w-md md:flex-none md:rounded-lg md:border md:border-line md:bg-white md:p-10">
        <Logo className="h-12 w-auto self-start" priority />
        <h1 className="mt-10 text-2xl font-semibold text-ink">Partner login</h1>
        <p className="mt-1 text-sm text-muted">Log in with the mobile number you registered as a PrimeScore partner.</p>
        <LoginForm />
      </div>
    </div>
  );
}
