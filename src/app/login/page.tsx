import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign in | Zyraa",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl = "/auth/redirect" } = await searchParams;

  return (
    <AuthLayout>
      <LoginForm callbackUrl={callbackUrl} />
    </AuthLayout>
  );
}
