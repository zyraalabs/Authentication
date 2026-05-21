import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";
import { HOME_URL } from "@/lib/env";

const s = {
  body: {
    backgroundColor: "#0F0F12",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    WebkitFontSmoothing: "antialiased" as const,
    margin: "0",
    padding: "32px 16px",
  },
  container: {
    maxWidth: "520px",
    margin: "0 auto",
    backgroundColor: "#111114",
    border: "1px solid #1E1E22",
    borderRadius: "12px",
    overflow: "hidden",
  },
  header: {
    padding: "28px 36px 24px",
    borderBottom: "1px solid #1A1A1E",
    textAlign: "center" as const,
  },
  logoZ: {
    color: "#F0922A",
    fontSize: "20px",
    fontWeight: "800",
    letterSpacing: "-0.03em",
  },
  logoRest: {
    color: "#F2F0EC",
    fontSize: "20px",
    fontWeight: "800",
    letterSpacing: "-0.03em",
  },
  bodyInner: {
    padding: "32px 36px",
  },
  footer: {
    padding: "18px 36px",
    borderTop: "1px solid #1A1A1E",
    textAlign: "center" as const,
  },
  footerText: {
    fontSize: "11px",
    color: "#5A5850",
    lineHeight: "1.8",
    margin: "0",
  },
  footerLink: {
    color: "#6B6760",
    textDecoration: "none",
  },
};

interface EmailLayoutProps {
  preview: string;
  children: ReactNode;
}

export function EmailLayout({ preview, children }: EmailLayoutProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={s.body}>
        <Container style={s.container}>
          <Section style={s.header}>
            <Link href={HOME_URL} style={{ textDecoration: "none" }}>
              <Text style={{ margin: 0 }}>
                <span style={s.logoZ}>Z</span>
                <span style={s.logoRest}>yraa</span>
              </Text>
            </Link>
          </Section>

          <Section style={s.bodyInner}>{children}</Section>

          <Section style={s.footer}>
            <Text style={s.footerText}>
              <Link href="#" style={s.footerLink}>
                Privacy
              </Link>
              {" · "}
              <Link href="#" style={s.footerLink}>
                Terms
              </Link>
              <br />© {new Date().getFullYear()} Zyraa
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export const emailDivider = (
  <Hr style={{ borderTop: "1px solid #1A1A1E", margin: "24px 0" }} />
);

export const t = {
  title: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#F2F0EC",
    letterSpacing: "-0.02em",
    marginBottom: "10px",
    lineHeight: "1.3",
  },
  body: {
    fontSize: "14px",
    color: "#A09C96",
    lineHeight: "1.7",
    margin: "0",
  },
  strong: {
    color: "#E0DED8",
  },
  note: {
    fontSize: "12px",
    color: "#7A7670",
    lineHeight: "1.6",
    margin: "0",
  },
  expiry: {
    textAlign: "center" as const,
    fontSize: "13px",
    color: "#A09C96",
    margin: "8px 0 0",
  },
};
