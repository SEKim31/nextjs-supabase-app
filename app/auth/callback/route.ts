import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";

/** 기본 리다이렉트 경로 */
const DEFAULT_REDIRECT = "/dashboard";

/**
 * 안전한 리다이렉트 경로인지 검증
 * Open Redirect 공격을 방지하기 위해 상대 경로만 허용
 *
 * @param path 검증할 경로
 * @returns 안전한 경로인지 여부
 */
function isValidRedirectPath(path: string): boolean {
  // 상대 경로만 허용 (/로 시작)
  // 프로토콜 상대 URL 차단 (//로 시작하는 경우)
  // URL 인코딩된 슬래시 차단 (%2F)
  return (
    path.startsWith("/") &&
    !path.startsWith("//") &&
    !path.includes("%2F") &&
    !path.includes("%2f")
  );
}

/**
 * 리다이렉트 URL 생성
 *
 * @param request NextRequest 객체
 * @param path 리다이렉트 경로
 * @returns 완전한 리다이렉트 URL
 */
function buildRedirectUrl(request: NextRequest, path: string): string {
  const { origin } = new URL(request.url);
  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";

  if (isLocalEnv) {
    return `${origin}${path}`;
  } else if (forwardedHost) {
    return `https://${forwardedHost}${path}`;
  }
  return `${origin}${path}`;
}

/**
 * OAuth 콜백 라우트
 * Google OAuth 인증 후 authorization code를 세션으로 교환합니다.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  // "next" 파라미터 검증 (Open Redirect 방지)
  const nextParam = searchParams.get("next") ?? DEFAULT_REDIRECT;
  const next = isValidRedirectPath(nextParam) ? nextParam : DEFAULT_REDIRECT;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const redirectUrl = buildRedirectUrl(request, next);
      return NextResponse.redirect(redirectUrl);
    }

    // 서버 로그에만 에러 기록 (프로덕션 환경에서도 추적 가능)
    console.error("[OAuth Callback Error]", {
      code: error.code,
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }

  // 에러 발생 시 에러 페이지로 리다이렉트 (민감한 정보 노출 방지)
  const errorUrl = buildRedirectUrl(request, "/auth/error");
  return NextResponse.redirect(errorUrl);
}
