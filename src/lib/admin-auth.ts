import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "lapuce-admin-session";
const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 h

function getSecret(): string {
  return process.env.ADMIN_PASSWORD || "LaPuce2026!";
}

export function verifyPassword(password: string): boolean {
  const secret = getSecret();
  if (password.length !== secret.length) return false;
  try {
    return timingSafeEqual(Buffer.from(password), Buffer.from(secret));
  } catch {
    return false;
  }
}

export function createSessionToken(): string {
  const expires = Date.now() + SESSION_MAX_AGE_MS;
  const payload = `admin:${expires}`;
  const sig = createHmac("sha256", getSecret()).update(payload).digest("hex");
  return Buffer.from(`${payload}:${sig}`).toString("base64url");
}

export function verifySessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64url").toString();
    const lastColon = decoded.lastIndexOf(":");
    if (lastColon === -1) return false;
    const payload = decoded.slice(0, lastColon);
    const sig = decoded.slice(lastColon + 1);
    if (!payload.startsWith("admin:")) return false;
    const expires = parseInt(payload.slice(6), 10);
    if (isNaN(expires) || Date.now() > expires) return false;
    const expected = createHmac("sha256", getSecret()).update(payload).digest("hex");
    if (sig.length !== expected.length) return false;
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdminAuthenticated())) {
    throw new AdminAuthError();
  }
}

export class AdminAuthError extends Error {
  constructor() {
    super("Non autorisé");
    this.name = "AdminAuthError";
  }
}
