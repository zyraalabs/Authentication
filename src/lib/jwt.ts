import { jwtVerify, SignJWT } from "jose";
import { JWT_SECRET } from "./env";
import { logger } from "./logger";

export interface JWTPayload {
  sub: string;
  email: string;
  name: string;
  image?: string;
  emailVerified: boolean;
  exp: number;
}

const secret = () => new TextEncoder().encode(JWT_SECRET);

export async function generateJWT(userData: {
  id: string;
  email: string;
  name: string;
  image?: string;
  emailVerified: boolean;
}): Promise<string> {
  if (!JWT_SECRET) throw new Error("JWT_SECRET must be defined");

  return new SignJWT({
    email: userData.email,
    name: userData.name,
    ...(userData.image ? { image: userData.image } : {}),
    emailVerified: userData.emailVerified,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userData.id)
    .setExpirationTime("30d")
    .sign(secret());
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    if (!JWT_SECRET) throw new Error("JWT_SECRET must be defined");
    const { payload } = await jwtVerify(token, secret());
    return payload as unknown as JWTPayload;
  } catch (error) {
    logger.error("verifyJWT", "JWT verification failed", error);
    return null;
  }
}
