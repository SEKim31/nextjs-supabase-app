// Mock 데이터 생성을 위한 헬퍼 함수 및 상수 정의

// ============================================
// UUID 상수 (하드코딩으로 개발 시 일관성 유지)
// ============================================

/** Mock 사용자 ID 목록 */
export const MOCK_USER_IDS = {
  USER_1: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d", // 민지 (현재 로그인 사용자)
  USER_2: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e", // 수현
  USER_3: "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f", // 지훈
  USER_4: "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a", // 서연
  USER_5: "e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b", // 현우
} as const;

/** Mock 그룹 ID 목록 */
export const MOCK_GROUP_IDS = {
  GROUP_1: "f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c", // 커플 그룹
  GROUP_2: "a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d", // 가족 그룹
  GROUP_3: "b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e", // 친구 그룹
} as const;

/** Mock 미션 ID 목록 */
export const MOCK_MISSION_IDS = {
  // 커플 그룹 미션
  MISSION_1: "c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f",
  MISSION_2: "d0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a",
  MISSION_3: "e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b",
  MISSION_4: "f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c",
  // 가족 그룹 미션
  MISSION_5: "a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d",
  MISSION_6: "b4c5d6e7-f8a9-4b0c-1d2e-3f4a5b6c7d8e",
  MISSION_7: "c5d6e7f8-a9b0-4c1d-2e3f-4a5b6c7d8e9f",
  MISSION_8: "d6e7f8a9-b0c1-4d2e-3f4a-5b6c7d8e9f0a",
  // 친구 그룹 미션
  MISSION_9: "e7f8a9b0-c1d2-4e3f-4a5b-6c7d8e9f0a1b",
  MISSION_10: "f8a9b0c1-d2e3-4f4a-5b6c-7d8e9f0a1b2c",
  MISSION_11: "a9b0c1d2-e3f4-4a5b-6c7d-8e9f0a1b2c3d",
  MISSION_12: "b0c1d2e3-f4a5-4b6c-7d8e-9f0a1b2c3d4e",
} as const;

/** Mock 그룹 멤버 ID 목록 */
export const MOCK_GROUP_MEMBER_IDS = {
  GM_1: "c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e5f",
  GM_2: "d2e3f4a5-b6c7-4d8e-9f0a-1b2c3d4e5f6a",
  GM_3: "e3f4a5b6-c7d8-4e9f-0a1b-2c3d4e5f6a7b",
  GM_4: "f4a5b6c7-d8e9-4f0a-1b2c-3d4e5f6a7b8c",
  GM_5: "a5b6c7d8-e9f0-4a1b-2c3d-4e5f6a7b8c9d",
  GM_6: "b6c7d8e9-f0a1-4b2c-3d4e-5f6a7b8c9d0e",
  GM_7: "c7d8e9f0-a1b2-4c3d-4e5f-6a7b8c9d0e1f",
  GM_8: "d8e9f0a1-b2c3-4d4e-5f6a-7b8c9d0e1f2a",
  GM_9: "e9f0a1b2-c3d4-4e5f-6a7b-8c9d0e1f2a3b",
} as const;

/** Mock 초대 링크 ID 목록 */
export const MOCK_INVITE_IDS = {
  INVITE_1: "f0a1b2c3-d4e5-4f6a-7b8c-9d0e1f2a3b4c",
  INVITE_2: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5e",
  INVITE_3: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6f",
} as const;

/** 현재 로그인한 사용자 ID (시뮬레이션용) */
export const MOCK_CURRENT_USER_ID = MOCK_USER_IDS.USER_1;

// ============================================
// 날짜 생성 헬퍼 함수
// ============================================

/**
 * 현재 시간에서 n일 전의 ISO 문자열 반환
 * @param days - 며칠 전인지
 * @returns ISO 형식 날짜 문자열
 */
export function daysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

/**
 * 현재 시간에서 n시간 전의 ISO 문자열 반환
 * @param hours - 몇 시간 전인지
 * @returns ISO 형식 날짜 문자열
 */
export function hoursAgo(hours: number): string {
  const date = new Date();
  date.setHours(date.getHours() - hours);
  return date.toISOString();
}

/**
 * 현재 시간에서 n분 전의 ISO 문자열 반환
 * @param minutes - 몇 분 전인지
 * @returns ISO 형식 날짜 문자열
 */
export function minutesAgo(minutes: number): string {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutes);
  return date.toISOString();
}

/**
 * 특정 일자의 특정 시간대 ISO 문자열 반환
 * @param daysOffset - 오늘 기준 며칠 전/후 (-는 과거, +는 미래)
 * @param hour - 시간 (0-23)
 * @param minute - 분 (0-59)
 * @returns ISO 형식 날짜 문자열
 */
export function dateAtTime(
  daysOffset: number,
  hour: number,
  minute: number = 0
): string {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}

// ============================================
// 인증/응원 ID 생성 헬퍼
// ============================================

/** 인증 ID 생성용 카운터 시작값 */
let verificationIdCounter = 1;

/**
 * 고유한 인증 ID 생성
 * @returns UUID 형식 문자열
 */
export function generateVerificationId(): string {
  const id = `v${String(verificationIdCounter).padStart(3, "0")}`;
  verificationIdCounter++;
  // UUID 형식으로 변환
  return `${id}00000-0000-4000-a000-000000000000`.slice(0, 36);
}

/** 응원 ID 생성용 카운터 시작값 */
let cheerIdCounter = 1;

/**
 * 고유한 응원 ID 생성
 * @returns UUID 형식 문자열
 */
export function generateCheerId(): string {
  const id = `c${String(cheerIdCounter).padStart(3, "0")}`;
  cheerIdCounter++;
  // UUID 형식으로 변환
  return `${id}00000-0000-4000-b000-000000000000`.slice(0, 36);
}

/** 알림 ID 생성용 카운터 시작값 */
let notificationIdCounter = 1;

/**
 * 고유한 알림 ID 생성
 * @returns UUID 형식 문자열
 */
export function generateNotificationId(): string {
  const id = `n${String(notificationIdCounter).padStart(3, "0")}`;
  notificationIdCounter++;
  // UUID 형식으로 변환
  return `${id}00000-0000-4000-c000-000000000000`.slice(0, 36);
}
