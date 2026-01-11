/**
 * 간단한 Rate Limiting 유틸리티
 *
 * 서버리스 환경에서는 in-memory 방식의 한계가 있습니다.
 * 프로덕션에서는 Upstash Redis 사용을 권장합니다.
 *
 * @example
 * // Upstash Redis 사용 시
 * npm install @upstash/ratelimit @upstash/redis
 *
 * import { Ratelimit } from "@upstash/ratelimit";
 * import { Redis } from "@upstash/redis";
 *
 * const ratelimit = new Ratelimit({
 *   redis: Redis.fromEnv(),
 *   limiter: Ratelimit.slidingWindow(5, "1 m"),
 * });
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// in-memory 저장소 (서버리스 환경에서는 인스턴스별로 분리됨)
const rateLimitStore = new Map<string, RateLimitEntry>();

// 주기적으로 만료된 항목 정리 (메모리 누수 방지)
const CLEANUP_INTERVAL = 60 * 1000; // 1분
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;

  lastCleanup = now;
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

export interface RateLimitConfig {
  /** 시간 윈도우 내 최대 요청 수 */
  limit: number;
  /** 시간 윈도우 (밀리초) */
  windowMs: number;
}

export interface RateLimitResult {
  /** 요청 허용 여부 */
  success: boolean;
  /** 남은 요청 수 */
  remaining: number;
  /** 제한 리셋까지 남은 시간 (초) */
  resetIn: number;
}

/**
 * Rate Limiting 체크
 *
 * @param identifier 식별자 (IP 주소, 사용자 ID 등)
 * @param config Rate Limit 설정
 * @returns Rate Limit 결과
 */
export function rateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  cleanup();

  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // 새로운 윈도우 시작
  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return {
      success: true,
      remaining: config.limit - 1,
      resetIn: Math.ceil(config.windowMs / 1000),
    };
  }

  // 기존 윈도우 내 요청
  if (entry.count < config.limit) {
    entry.count++;
    return {
      success: true,
      remaining: config.limit - entry.count,
      resetIn: Math.ceil((entry.resetTime - now) / 1000),
    };
  }

  // 제한 초과
  return {
    success: false,
    remaining: 0,
    resetIn: Math.ceil((entry.resetTime - now) / 1000),
  };
}

/** 인증 관련 경로 Rate Limit 설정 */
export const AUTH_RATE_LIMIT: RateLimitConfig = {
  limit: 5, // 1분당 5회
  windowMs: 60 * 1000,
};

/** 일반 API Rate Limit 설정 */
export const API_RATE_LIMIT: RateLimitConfig = {
  limit: 100, // 1분당 100회
  windowMs: 60 * 1000,
};
