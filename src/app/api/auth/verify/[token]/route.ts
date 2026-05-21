import { UserModel } from "@zyraalabs/zyraa-db";
import type { NextRequest } from "next/server";
import { ErrorResponse, SuccessResponse } from "@/lib/apiResponse";
import { connectToDatabase } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/email";
import { logger } from "@/lib/logger";
import {
  generateVerificationToken,
  getVerificationTokenExpiry,
} from "@/lib/tokens";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  try {
    await connectToDatabase();
    const { token } = await params;

    if (!token) {
      return ErrorResponse("Verification token is required", 400);
    }

    const user = await UserModel.findOne({ verificationToken: token });

    if (!user) {
      logger.warn("verify-email", `Invalid token: ${token.substring(0, 10)}…`);
      return ErrorResponse("Invalid or expired verification token", 400);
    }

    if (user.emailVerified) {
      return ErrorResponse("Email is already verified", 400);
    }

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
          "verify-email",
          `New verification email sent to: ${user.email}`,
        );
        return ErrorResponse(
          "Token expired. A new verification email has been sent.",
          400,
        );
      } catch {
        return ErrorResponse(
          "Token expired. Please request a new verification email.",
          400,
        );
      }
    }

    user.emailVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    logger.info("verify-email", `Email verified: ${user.email}`);
    return SuccessResponse({
      message: "Email verified successfully",
      email: user.email,
    });
  } catch (error) {
    logger.error("verify-email", "Verification failed", error);
    return ErrorResponse("Internal server error", 500);
  }
}
