import { UserModel } from "@zyraalabs/zyraa-db";
import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { VerifyResult } from "@/components/auth/verify-result";
import { connectToDatabase } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/email";
import { logger } from "@/lib/logger";
import {
  generateVerificationToken,
  getVerificationTokenExpiry,
} from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Verify email | Zyraa",
};

type VerifyStatus =
  | "success"
  | "already-verified"
  | "expired"
  | "invalid"
  | "error";

async function verifyToken(token: string): Promise<VerifyStatus> {
  try {
    await connectToDatabase();

    const user = await UserModel.findOne({ verificationToken: token });

    if (!user) return "invalid";
    if (user.emailVerified) return "already-verified";

    if (
      user.verificationTokenExpires &&
      new Date() > user.verificationTokenExpires
    ) {
      const newToken = generateVerificationToken();
      user.verificationToken = newToken;
      user.verificationTokenExpires = getVerificationTokenExpiry();
      await user.save();

      try {
        await sendVerificationEmail(user.email, user.name ?? "", newToken);
        logger.info(
          "verify-page",
          `New verification email sent to: ${user.email}`,
        );
      } catch {
        logger.error("verify-page", `Failed to resend to: ${user.email}`);
      }

      return "expired";
    }

    user.emailVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    logger.info("verify-page", `Email verified: ${user.email}`);
    return "success";
  } catch (error) {
    logger.error("verify-page", "Verification error", error);
    return "error";
  }
}

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const status = await verifyToken(token);

  return (
    <AuthLayout>
      <VerifyResult status={status} />
    </AuthLayout>
  );
}
