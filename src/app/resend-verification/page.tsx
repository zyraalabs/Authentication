import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { ResendVerificationForm } from "@/components/auth/resend-verification-form";

export const metadata: Metadata = {
  title: "Verify email | Zyraa",
};

export default function ResendVerificationPage() {
  return (
    <AuthLayout>
      <ResendVerificationForm />
    </AuthLayout>
  );
}
