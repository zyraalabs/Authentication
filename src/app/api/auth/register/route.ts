import { Plan, Provider, UserModel } from "@zyraalabs/zyraa-db";
import bcrypt from "bcryptjs";
import type { NextRequest } from "next/server";
import { ZodError } from "zod";
import { ErrorResponse, SuccessResponse } from "@/lib/apiResponse";
import { connectToDatabase } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/email";
import { logger } from "@/lib/logger";
import {
  generateVerificationToken,
  getVerificationTokenExpiry,
} from "@/lib/tokens";
import { type RegisterInput, registerSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const validatedData: RegisterInput = registerSchema.parse(body);
    const { name, email, password } = validatedData;

    const existingUser = await UserModel.findOne({
      email: email,
    });
    if (existingUser) {
      logger.warn(
        "register",
        `Registration failed - email already exists: ${email}`,
      );
      return ErrorResponse("User with this email already exists", 409);
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const verificationToken = generateVerificationToken();
    const verificationTokenExpires = getVerificationTokenExpiry();

    const newUser = new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
      emailVerified: false,
      verificationToken,
      verificationTokenExpires,
      providers: [
        {
          provider: Provider.CREDENTIALS,
          providerAccountId: email,
        },
      ],
      isPremium: false,
      plan: Plan.FREE,
      trialUsed: false,
      usage: {
        totalBuilds: 0,
        remainingTrial: 4,
      },
    });
    const savedUser = await newUser.save();
    logger.info("register", `User created successfully: ${email}`);

    try {
      await sendVerificationEmail(email, name, verificationToken);
      logger.info("register", `Verification email sent to: ${email}`);
    } catch (emailError) {
      logger.error(
        "register",
        `Failed to send verification email to: ${email}`,
        emailError,
      );
    }
    const userResponse = {
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      emailVerified: savedUser.emailVerified,
      isPremium: savedUser.isPremium,
      plan: savedUser.plan,
      trialUsed: savedUser.trialUsed,
      usage: savedUser.usage,
    };

    logger.info(
      "register",
      `Registration completed successfully for: ${email}`,
    );
    return SuccessResponse(
      {
        message:
          "User registered successfully. Please check your email to verify your account.",
        user: userResponse,
      },
      201,
    );
  } catch (error) {
    if (error instanceof ZodError) {
      logger.warn("register", `Validation error: ${error.issues[0].message}`);
      return ErrorResponse(error.issues[0].message, 400);
    }

    if (error instanceof Error && error.name === "ValidationError") {
      logger.warn("register", "Invalid user data provided");
      return ErrorResponse("Invalid user data provided", 400);
    }

    if (error instanceof Error && "code" in error && error.code === 11000) {
      logger.warn("register", "Duplicate email registration attempt");
      return ErrorResponse("User with this email already exists", 409);
    }

    logger.error("register", "Registration failed", error);
    return ErrorResponse("Internal server error", 500);
  }
}
