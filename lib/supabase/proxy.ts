import { NextResponse, type NextRequest } from "next/server";

import { createServerClient } from "@supabase/ssr";

import { hasEnvVars } from "../utils";
import { rateLimit, AUTH_RATE_LIMIT } from "../utils/rate-limit";

/** 보호된 경로 목록 */
const PROTECTED_PATHS = [
  "/dashboard",
  "/groups",
  "/missions",
  "/profile",
  "/settings",
  "/stats",
];

// 참고: 공개 경로 목록 (향후 확장 시 사용)
// const PUBLIC_PATHS = ["/", "/auth", "/invite"];

/**
 * 보호된 경로인지 확인
 */
function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some((path) => pathname.startsWith(path));
}

/**
 * 인증 관련 경로인지 확인 (Rate Limiting 적용 대상)
 */
function isAuthPath(pathname: string): boolean {
  return (
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/sign-up") ||
    pathname.startsWith("/auth/forgot-password") ||
    pathname.startsWith("/auth/callback")
  );
}

/**
 * 클라이언트 IP 주소 추출
 */
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  return "unknown";
}

/**
 * Rate Limit 초과 응답 생성
 */
function createRateLimitResponse(resetIn: number): NextResponse {
  return NextResponse.json(
    {
      error: "너무 많은 요청입니다. 잠시 후 다시 시도하세요.",
      retryAfter: resetIn,
    },
    {
      status: 429,
      headers: {
        "Retry-After": String(resetIn),
        "X-RateLimit-Remaining": "0",
      },
    }
  );
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // 환경 변수가 설정되지 않은 경우 스킵
  if (!hasEnvVars) {
    return supabaseResponse;
  }

  const pathname = request.nextUrl.pathname;

  // 인증 경로에 Rate Limiting 적용
  if (isAuthPath(pathname)) {
    const clientIp = getClientIp(request);
    const rateLimitResult = rateLimit(`auth:${clientIp}`, AUTH_RATE_LIMIT);

    if (!rateLimitResult.success) {
      return createRateLimitResponse(rateLimitResult.resetIn);
    }

    // Rate Limit 헤더 추가
    supabaseResponse.headers.set(
      "X-RateLimit-Remaining",
      String(rateLimitResult.remaining)
    );
  }

  // Supabase 클라이언트 생성 (Fluid compute 환경에서는 매번 새로 생성)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 세션 검증 (createServerClient와 getClaims 사이에 코드 추가 금지)
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  // 보호된 경로에 미인증 사용자 접근 시 리다이렉트
  if (isProtectedPath(pathname) && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    // 로그인 후 원래 페이지로 돌아가기 위해 redirect 파라미터 추가
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
