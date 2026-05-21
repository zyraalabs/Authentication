import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthLogo } from "./auth-logo";

type VerifyStatus =
  | "success"
  | "already-verified"
  | "expired"
  | "invalid"
  | "error";

interface VerifyResultProps {
  status: VerifyStatus;
}

const STATES: Record<
  VerifyStatus,
  { icon: string; title: string; body: string }
> = {
  success: {
    icon: "✓",
    title: "Email verified.",
    body: "Your account is active. You can now sign in.",
  },
  "already-verified": {
    icon: "✓",
    title: "Already verified.",
    body: "Your email is already verified. Head to sign in.",
  },
  expired: {
    icon: "↻",
    title: "Link expired.",
    body: "We've sent a fresh verification link to your inbox.",
  },
  invalid: {
    icon: "✕",
    title: "Invalid link.",
    body: "This verification link is invalid or has already been used.",
  },
  error: {
    icon: "✕",
    title: "Something went wrong.",
    body: "An unexpected error occurred. Please try again later.",
  },
};

const isSuccess = (s: VerifyStatus) =>
  s === "success" || s === "already-verified" || s === "expired";

export function VerifyResult({ status }: VerifyResultProps) {
  const state = STATES[status];
  const ok = isSuccess(status);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm text-center">
      <AuthLogo size="lg" />

      <div
        className={`flex items-center justify-center size-14 rounded-full text-[22px] font-bold ${
          ok
            ? "bg-success-l/10 text-success-l"
            : "bg-destructive/10 text-destructive"
        }`}
      >
        {state.icon}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-[1.5rem] font-bold tracking-tight text-foreground">
          {state.title}
        </h2>
        <p className="text-sm text-muted-foreground">{state.body}</p>
      </div>

      <div className="flex flex-col gap-3 w-full">
        {ok ? (
          <Button variant="brand" size="xl" className="w-full" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
        ) : (
          <>
            <Button variant="brand" size="xl" className="w-full" asChild>
              <Link href="/resend-verification">Resend verification</Link>
            </Button>
            <Button variant="outline" size="xl" className="w-full" asChild>
              <Link href="/login">Back to sign in</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
