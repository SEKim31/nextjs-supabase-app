// Supabase 및 API 에러 핸들링 유틸리티

import { AuthError, PostgrestError } from "@supabase/supabase-js";

/**
 * 앱 에러 인터페이스
 */
export interface AppError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

/**
 * Supabase Auth 에러 코드별 한글 메시지
 */
const AUTH_ERROR_MESSAGES: Record<string, string> = {
  // 로그인 관련
  invalid_credentials: "이메일 또는 비밀번호가 올바르지 않습니다.",
  invalid_grant: "이메일 또는 비밀번호가 올바르지 않습니다.",
  user_not_found: "등록되지 않은 사용자입니다.",

  // 회원가입 관련
  user_already_exists: "이미 가입된 이메일입니다.",
  email_exists: "이미 사용 중인 이메일입니다.",
  weak_password: "비밀번호가 너무 약합니다.",
  signup_disabled: "현재 회원가입이 비활성화되어 있습니다.",

  // 이메일 인증 관련
  email_not_confirmed: "이메일 인증이 필요합니다.",
  confirmation_expired: "인증 링크가 만료되었습니다.",

  // 세션 관련
  session_not_found: "세션이 만료되었습니다. 다시 로그인하세요.",
  refresh_token_not_found: "세션이 만료되었습니다. 다시 로그인하세요.",

  // 비밀번호 재설정 관련
  same_password: "새 비밀번호는 현재 비밀번호와 달라야 합니다.",

  // OAuth 관련
  provider_disabled: "해당 소셜 로그인이 비활성화되어 있습니다.",

  // 요청 관련
  over_request_rate_limit: "요청이 너무 많습니다. 잠시 후 다시 시도하세요.",
  over_email_send_rate_limit:
    "이메일 발송 한도를 초과했습니다. 잠시 후 다시 시도하세요.",
};

/**
 * PostgreSQL 에러 코드별 한글 메시지
 */
const POSTGRES_ERROR_MESSAGES: Record<string, string> = {
  "23505": "이미 존재하는 데이터입니다.",
  "23503": "참조하는 데이터가 존재하지 않습니다.",
  "23502": "필수 데이터가 누락되었습니다.",
  "42501": "해당 작업에 대한 권한이 없습니다.",
  "42P01": "요청한 데이터를 찾을 수 없습니다.",
  PGRST116: "요청한 데이터를 찾을 수 없습니다.",
};

/**
 * Supabase 에러를 AppError로 변환
 *
 * @param error AuthError 또는 PostgrestError
 * @returns AppError 또는 null
 */
export function handleSupabaseError(
  error: AuthError | PostgrestError | null
): AppError | null {
  if (!error) return null;

  return {
    message: error.message,
    code: "code" in error ? error.code : undefined,
  };
}

/**
 * AuthError 타입 가드
 *
 * @param error 확인할 에러
 * @returns AuthError인지 여부
 */
export function isAuthError(error: unknown): error is AuthError {
  return error instanceof AuthError;
}

/**
 * PostgrestError 타입 가드
 *
 * @param error 확인할 에러
 * @returns PostgrestError인지 여부
 */
export function isPostgrestError(error: unknown): error is PostgrestError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "message" in error &&
    "details" in error
  );
}

/**
 * 사용자 친화적 에러 메시지 반환
 *
 * @param error AppError 또는 에러 코드/메시지를 가진 객체
 * @returns 한글 에러 메시지
 */
export function getErrorMessage(
  error: AppError | { code?: string; message?: string } | null
): string {
  if (!error) return "오류가 발생했습니다.";

  const code = error.code;

  // 에러 코드로 한글 메시지 찾기
  if (code) {
    if (AUTH_ERROR_MESSAGES[code]) {
      return AUTH_ERROR_MESSAGES[code];
    }
    if (POSTGRES_ERROR_MESSAGES[code]) {
      return POSTGRES_ERROR_MESSAGES[code];
    }
  }

  // 에러 메시지 반환 (또는 기본 메시지)
  return error.message || "오류가 발생했습니다.";
}

/**
 * 에러에서 AppError 추출
 *
 * @param error unknown 타입 에러
 * @returns AppError
 */
export function toAppError(error: unknown): AppError {
  if (isAuthError(error)) {
    return {
      message: error.message,
      code: error.code,
    };
  }

  if (isPostgrestError(error)) {
    return {
      message: error.message,
      code: error.code,
      details: error.details ? { details: error.details } : undefined,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  if (typeof error === "string") {
    return {
      message: error,
    };
  }

  return {
    message: "알 수 없는 오류가 발생했습니다.",
  };
}

/**
 * 에러 로깅 (개발 환경에서만)
 *
 * @param error 로깅할 에러
 * @param context 추가 컨텍스트 정보
 */
export function logError(
  error: unknown,
  context?: Record<string, unknown>
): void {
  if (process.env.NODE_ENV === "development") {
    console.error("[Error]", error, context);
  }
}
