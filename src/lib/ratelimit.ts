import { config } from "./config";

/**
 * Lightweight in-memory rate limiting + global daily cap.
 *
 * Note: state lives in the server process memory. On serverless platforms it
 * is per-instance and resets on redeploy/cold start — good enough as a first
 * line of defense. For strict, persistent limits across instances, swap this
 * for Upstash Redis (the interface below makes that easy).
 */

type Hit = { count: number; resetAt: number };

const perIp = new Map<string, Hit>();

let dayKey = currentDayKey();
let dailyCount = 0;

function currentDayKey(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
}

export type RateResult =
  | { ok: true }
  | { ok: false; reason: "ip" | "daily"; retryAfterSec: number };

export function checkRateLimit(ip: string): RateResult {
  const now = Date.now();

  // Reset the global daily counter at UTC midnight.
  const today = currentDayKey();
  if (today !== dayKey) {
    dayKey = today;
    dailyCount = 0;
  }

  if (dailyCount >= config.dailyGlobalCap) {
    const tomorrow = new Date();
    tomorrow.setUTCHours(24, 0, 0, 0);
    return {
      ok: false,
      reason: "daily",
      retryAfterSec: Math.ceil((tomorrow.getTime() - now) / 1000),
    };
  }

  const hit = perIp.get(ip);
  if (!hit || now > hit.resetAt) {
    perIp.set(ip, { count: 1, resetAt: now + config.rateLimitWindowMs });
    dailyCount++;
    return { ok: true };
  }

  if (hit.count >= config.rateLimitMax) {
    return {
      ok: false,
      reason: "ip",
      retryAfterSec: Math.ceil((hit.resetAt - now) / 1000),
    };
  }

  hit.count++;
  dailyCount++;
  return { ok: true };
}

export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return (
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}
