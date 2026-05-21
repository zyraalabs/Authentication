import type { ReactNode } from "react";
import { AuthLeft } from "./auth-left";
import { BackButton } from "./back-button";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[3fr_2fr]">
      <BackButton />
      <AuthLeft />
      <div className="min-h-screen flex items-center justify-center px-10 py-16 lg:bg-card lg:border-l lg:border-border">
        {children}
      </div>
    </div>
  );
}
