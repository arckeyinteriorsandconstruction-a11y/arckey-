import { createHash, createHmac, timingSafeEqual } from "node:crypto";

const secret = () => process.env.REVIEW_SECRET || process.env.ADMIN_PASSWORD || "arckey-dev-secret";

/** One-way hash of the visitor's IP. Used only for rate limiting; the raw IP is never stored. */
export function ipHash(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = fwd || headers.get("x-real-ip") || "unknown";
  return createHash("sha256").update(`${ip}|${secret()}`).digest("hex").slice(0, 32);
}

const sign = (v: string) => createHmac("sha256", secret()).update(v).digest("hex");

const safeEqual = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

export const ADMIN_COOKIE = "arckey_admin";
const ADMIN_TTL_MS = 1000 * 60 * 60 * 12;

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function checkAdminPassword(input: string): boolean {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return false;
  return safeEqual(createHash("sha256").update(input).digest("hex"), createHash("sha256").update(pw).digest("hex"));
}

export function makeAdminToken(): string {
  const exp = String(Date.now() + ADMIN_TTL_MS);
  return `${exp}.${sign(`admin:${exp}`)}`;
}

export function verifyAdminToken(token: string | undefined): boolean {
  if (!token || !adminConfigured()) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return safeEqual(sig, sign(`admin:${exp}`));
}

export const ADMIN_TTL_SECONDS = ADMIN_TTL_MS / 1000;
