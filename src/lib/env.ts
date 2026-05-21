// ── Client-side (NEXT_PUBLIC_) ────────────────────────────────────────────────
export const HOME_URL =
  process.env.NEXT_PUBLIC_HOME_URL ?? "http://localhost:3000";

// ── Server-side service URLs ──────────────────────────────────────────────────
export const APP_URL = process.env.NEXTAUTH_URL ?? "http://localhost:3001";

// Zyraa dashboard app URL
export const ZYRAA_APP_URL =
  process.env.ZYRAA_APP_URL ?? "http://localhost:3002";

// ── Auth secrets ──────────────────────────────────────────────────────────────
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET ?? "";

export const JWT_SECRET =
  process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || "";

export const NEXTAUTH_COOKIE_DOMAIN =
  process.env.NEXTAUTH_COOKIE_DOMAIN || undefined;

// ── OAuth providers ───────────────────────────────────────────────────────────
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? "";
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET ?? "";
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID ?? "";
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET ?? "";

// ── Database ──────────────────────────────────────────────────────────────────
export const MONGODB_URI = process.env.MONGODB_URI ?? "";

// ── Email (Resend) ────────────────────────────────────────────────────────────
export const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
export const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

// ── Upstash Redis ─────────────────────────────────────────────────────────────
export const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL ?? "";
export const UPSTASH_REDIS_REST_TOKEN =
  process.env.UPSTASH_REDIS_REST_TOKEN ?? "";

// ── Environment flags ─────────────────────────────────────────────────────────
export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

if (IS_PRODUCTION && !NEXTAUTH_COOKIE_DOMAIN)
  throw new Error("NEXTAUTH_COOKIE_DOMAIN must be set in production");
