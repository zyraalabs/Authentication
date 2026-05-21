import { UserModel } from "@zyraalabs/zyraa-db";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { ErrorResponse, SuccessResponse } from "@/lib/apiResponse";
import { connectToDatabase } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/email";
import { logger } from "@/lib/logger";
import {
  generateVerificationToken,
  getVerificationTokenExpiry,
} from "@/lib/tokens";

const resendSchema = z.object({
  email: z.string().email("Please provide a valid email address").toLowerCase(),
});

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { email } = resendSchema.parse(body);

    const user = await UserModel.findOne({ email });

    if (!user) {
      logger.warn("resend-verification", `User not found: ${email}`);
      return ErrorResponse("User not found", 404);
    }

    if (user.emailVerified) {
      logger.warn("resend-verification", `Email already verified: ${email}`);
      return ErrorResponse("Email is already verified", 400);
    }

    const verificationToken = generateVerificationToken();
    const verificationTokenExpires = getVerificationTokenExpiry();

    user.verificationToken = verificationToken;
    user.verificationTokenExpires = verificationTokenExpires;
    await user.save();

    try {
      await sendVerificationEmail(email, user.name ?? "", verificationToken);
      logger.info(
        "resend-verification",
        `Verification email sent successfully to: ${email}`,
      );
    } catch (emailError) {
      logger.error(
        "resend-verification",
        `Failed to send verification email to: ${email}`,
        emailError,
      );
      return ErrorResponse("Failed to send verification email", 500);
    }

    return SuccessResponse({
      message: "Verification email sent successfully. Please check your inbox.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn(
        "resend-verification",
        `Validation error: ${error.issues[0].message}`,
      );
      return ErrorResponse(error.issues[0].message, 400);
    }

    logger.error("resend-verification", "Resend verification failed", error);
    return ErrorResponse("Internal server error", 500);
  }
}
