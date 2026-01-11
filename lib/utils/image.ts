// 이미지 URL 관련 유틸리티

// Supabase Storage 버킷 이름
export const STORAGE_BUCKETS = {
  PROFILES: "profiles",
  VERIFICATIONS: "verifications",
} as const;

// 기본 이미지 경로
const DEFAULT_PROFILE_IMAGE = "/images/default-profile.png";
const DEFAULT_VERIFICATION_IMAGE = "/images/default-verification.png";

/**
 * Supabase Storage URL 생성
 *
 * @param bucket 스토리지 버킷 이름
 * @param path 파일 경로
 * @returns 공개 URL
 */
export function getStorageUrl(bucket: string, path: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) {
    console.warn("NEXT_PUBLIC_SUPABASE_URL이 설정되지 않았습니다.");
    return "";
  }

  // path가 이미 전체 URL인 경우 그대로 반환
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // 선행 슬래시 제거
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${cleanPath}`;
}

/**
 * 프로필 이미지 URL 반환
 * null이거나 빈 문자열인 경우 기본 이미지 반환
 *
 * @param url 프로필 이미지 URL (null 가능)
 * @returns 프로필 이미지 URL
 */
export function getProfileImageUrl(url: string | null | undefined): string {
  if (!url || url.trim() === "") {
    return DEFAULT_PROFILE_IMAGE;
  }

  // 이미 전체 URL인 경우 그대로 반환
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Storage 경로인 경우 URL 생성
  return getStorageUrl(STORAGE_BUCKETS.PROFILES, url);
}

/**
 * 인증 이미지 URL 반환
 * null이거나 빈 문자열인 경우 기본 이미지 반환
 *
 * @param url 인증 이미지 URL (null 가능)
 * @returns 인증 이미지 URL
 */
export function getVerificationImageUrl(
  url: string | null | undefined
): string {
  if (!url || url.trim() === "") {
    return DEFAULT_VERIFICATION_IMAGE;
  }

  // 이미 전체 URL인 경우 그대로 반환
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Storage 경로인 경우 URL 생성
  return getStorageUrl(STORAGE_BUCKETS.VERIFICATIONS, url);
}

/**
 * 이미지 URL이 유효한지 확인
 *
 * @param url 확인할 URL
 * @returns 유효한 URL인지 여부
 */
export function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url || url.trim() === "") return false;

  try {
    new URL(url);
    return true;
  } catch {
    // 상대 경로도 유효한 것으로 간주
    return url.startsWith("/") || !url.includes("://");
  }
}
