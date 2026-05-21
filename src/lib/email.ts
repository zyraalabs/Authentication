import { render } from "@react-email/components";
import { Resend } from "resend";
import { ResetPasswordEmail } from "@/emails/reset-password";
import { VerifyEmail } from "@/emails/verify-email";
import { WelcomeEmail } from "@/emails/welcome";
import { APP_URL, RESEND_API_KEY, RESEND_FROM_EMAIL } from "./env";
import { logger } from "./logger";

const resend = new Resend(RESEND_API_KEY);
const FROM = RESEND_FROM_EMAIL;

async function sendEmail(
  to: string,
  subject: string,
  react: React.ReactElement,
) {
  const html = await render(react);
  const { error } = await resend.emails.send({ from: FROM, to, subject, html });
  if (error) {
    logger.error("email", `Failed to send "${subject}" to ${to}`, error);
    throw new Error("Failed to send email");
  }
}

export async function sendVerificationEmail(
  email: string,
  name: string,
  token: string,
) {
  const verificationUrl = `${APP_URL}/verify/${token}`;
  await sendEmail(
    email,
    "Verify your email address - Zyraa",
    VerifyEmail({ name, verificationUrl }),
  );
}

export async function sendWelcomeEmail(email: string, name: string) {
  const dashboardUrl = `${APP_URL}/dashboard`;
  await sendEmail(
    email,
    `Welcome to Zyraa, ${name}.`,
    WelcomeEmail({ name, dashboardUrl }),
  );
}

export async function sendResetPasswordEmail(email: string, token: string) {
  const resetUrl = `${APP_URL}/reset-password/${token}`;
  await sendEmail(
    email,
    "Reset your Zyraa password",
    ResetPasswordEmail({ name: email, resetUrl }),
  );
}
