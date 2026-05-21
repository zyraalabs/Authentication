import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Create account | Zyraa",
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl = "/auth/redirect" } = await searchParams;

  return (
    <AuthLayout>
      <RegisterForm callbackUrl={callbackUrl} />
    </AuthLayout>
  );
}
