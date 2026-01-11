// 초대 토큰 관련 유틸리티

/**
 * 초대 토큰 생성
 * UUID 형식의 고유 토큰을 생성합니다.
 *
 * @returns 생성된 초대 토큰 (UUID)
 */
export function generateInviteToken(): string {
  return crypto.randomUUID();
}

/**
 * 토큰 만료 여부 확인
 *
 * @param expiresAt 만료 시간 (ISO 문자열)
 * @returns 만료되었으면 true
 */
export function isTokenExpired(expiresAt: string): boolean {
  return new Date(expiresAt) < new Date();
}

/**
 * 토큰 만료까지 남은 시간 계산 (밀리초)
 *
 * @param expiresAt 만료 시간 (ISO 문자열)
 * @returns 남은 시간 (밀리초), 이미 만료되었으면 0
 */
export function getTokenRemainingTime(expiresAt: string): number {
  const remaining = new Date(expiresAt).getTime() - Date.now();
  return remaining > 0 ? remaining : 0;
}

/**
 * 초대 링크 만료 일시 생성
 * 기본값: 7일 후
 *
 * @param daysFromNow 지금으로부터 며칠 후 (기본값: 7)
 * @returns 만료 일시
 */
export function getInviteExpiryDate(daysFromNow: number = 7): Date {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date;
}

/**
 * 초대 링크 URL 생성
 *
 * @param token 초대 토큰
 * @param baseUrl 기본 URL (기본값: 환경 변수 또는 빈 문자열)
 * @returns 완전한 초대 링크 URL
 */
export function getInviteUrl(token: string, baseUrl?: string): string {
  const base =
    baseUrl ||
    (typeof window !== "undefined" ? window.location.origin : "") ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "";

  return `${base}/invite/${token}`;
}
