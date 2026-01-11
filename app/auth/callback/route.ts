import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";

/**
 * OAuth 콜백 라우트
 * Google OAuth 인증 후 authorization code를 세션으로 교환합니다.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // "next" 파라미터가 있으면 해당 URL로 리다이렉트
  let next = searchParams.get("next") ?? "/protected";

  // next가 상대 경로가 아니면 기본값 사용 (보안)
  if (!next.startsWith("/")) {
    next = "/protected";
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // 로드 밸런서가 있는 경우 x-forwarded-host 헤더 확인
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        // 로컬 개발 환경에서는 origin 사용
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // 에러 발생 시 에러 페이지로 리다이렉트
  return NextResponse.redirect(
    `${origin}/auth/error?error=OAuth 인증에 실패했습니다`
  );
}
