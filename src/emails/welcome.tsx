import { Text } from "@react-email/components";
import { EmailButton } from "./components/email-button";
import { EmailCodeBlock } from "./components/email-code-block";
import { EmailLayout, emailDivider, t } from "./components/email-layout";

interface WelcomeEmailProps {
  name: string;
  dashboardUrl: string;
}

const CLI_LINES = [
  {
    success: true,
    text: "built todo app with auth",
    dim: "· 14 files · 18.4s",
  },
  { brand: true, text: "Detecting framework…", dim: "nextjs · SSR required" },
  { success: true, text: "scaffolded", dim: "· 0.9s" },
  { brand: true, text: "Writing files…", dim: "src/app/dashboard/page.tsx" },
];

WelcomeEmail.PreviewProps = {
  name: "John Doe",
  dashboardUrl: "https://app.zyraa.dev/dashboard",
} satisfies WelcomeEmailProps;

export function WelcomeEmail({ name, dashboardUrl }: WelcomeEmailProps) {
  return (
    <EmailLayout preview={`Welcome to Zyraa, ${name}. Start building.`}>
      <Text style={t.title}>Welcome, {name}.</Text>
      <Text style={t.body}>
        You're in. Build full-stack apps directly from your terminal — no
        boilerplate, no setup friction.
      </Text>

      <EmailButton href={dashboardUrl}>Go to dashboard →</EmailButton>

      {emailDivider}

      <Text style={{ ...t.body, marginBottom: "12px" }}>
        Get started in seconds:
      </Text>
      <EmailCodeBlock lines={CLI_LINES} />

      {emailDivider}

      <Text style={t.note}>
        Questions? Reply to this email — we read everything.
      </Text>
    </EmailLayout>
  );
}

export default WelcomeEmail;
