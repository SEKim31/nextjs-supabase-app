// Mock 응원 데이터

import type { Cheer } from "@/lib/types/database";

import { hoursAgo, MOCK_USER_IDS } from "./helpers";
import { VERIFICATION_IDS } from "./verifications";

// ============================================
// 응원 ID 상수 (하드코딩)
// ============================================

const CHEER_IDS = {
  C001: "c0010000-0000-4000-b000-000000000001",
  C002: "c0020000-0000-4000-b000-000000000002",
  C003: "c0030000-0000-4000-b000-000000000003",
  C004: "c0040000-0000-4000-b000-000000000004",
  C005: "c0050000-0000-4000-b000-000000000005",
  C006: "c0060000-0000-4000-b000-000000000006",
  C007: "c0070000-0000-4000-b000-000000000007",
  C008: "c0080000-0000-4000-b000-000000000008",
  C009: "c0090000-0000-4000-b000-000000000009",
  C010: "c0100000-0000-4000-b000-000000000010",
  C011: "c0110000-0000-4000-b000-000000000011",
  C012: "c0120000-0000-4000-b000-000000000012",
  C013: "c0130000-0000-4000-b000-000000000013",
  C014: "c0140000-0000-4000-b000-000000000014",
  C015: "c0150000-0000-4000-b000-000000000015",
} as const;

// ============================================
// Mock 응원 데이터
// ============================================

/**
 * Mock 응원 목록
 * - 자기 자신의 인증에는 응원하지 않음
 * - 인증당 0~3개의 응원
 */
export const MOCK_CHEERS: Cheer[] = [
  // ============================================
  // V001 (민지의 굿모닝 인증) - 수현이 응원
  // ============================================
  {
    id: CHEER_IDS.C001,
    verification_id: VERIFICATION_IDS.V001,
    user_id: MOCK_USER_IDS.USER_2, // 수현
    created_at: hoursAgo(2),
  },

  // ============================================
  // V002 (수현의 굿모닝 인증) - 민지가 응원
  // ============================================
  {
    id: CHEER_IDS.C002,
    verification_id: VERIFICATION_IDS.V002,
    user_id: MOCK_USER_IDS.USER_1, // 민지
    created_at: hoursAgo(1),
  },

  // ============================================
  // V003 (민지의 아침 운동) - 수현, 지훈, 서연이 응원
  // ============================================
  {
    id: CHEER_IDS.C003,
    verification_id: VERIFICATION_IDS.V003,
    user_id: MOCK_USER_IDS.USER_2, // 수현
    created_at: hoursAgo(3),
  },
  {
    id: CHEER_IDS.C004,
    verification_id: VERIFICATION_IDS.V003,
    user_id: MOCK_USER_IDS.USER_3, // 지훈
    created_at: hoursAgo(4),
  },
  {
    id: CHEER_IDS.C005,
    verification_id: VERIFICATION_IDS.V003,
    user_id: MOCK_USER_IDS.USER_4, // 서연
    created_at: hoursAgo(5),
  },

  // ============================================
  // V005 (민지의 감사 일기) - 수현이 응원
  // ============================================
  {
    id: CHEER_IDS.C006,
    verification_id: VERIFICATION_IDS.V005,
    user_id: MOCK_USER_IDS.USER_2, // 수현
    created_at: hoursAgo(20),
  },

  // ============================================
  // V006 (수현의 감사 일기) - 민지가 응원
  // ============================================
  {
    id: CHEER_IDS.C007,
    verification_id: VERIFICATION_IDS.V006,
    user_id: MOCK_USER_IDS.USER_1, // 민지
    created_at: hoursAgo(18),
  },

  // ============================================
  // V010 (지훈의 헬스장 인증) - 서연, 현우가 응원
  // ============================================
  {
    id: CHEER_IDS.C008,
    verification_id: VERIFICATION_IDS.V010,
    user_id: MOCK_USER_IDS.USER_4, // 서연
    created_at: hoursAgo(70),
  },
  {
    id: CHEER_IDS.C009,
    verification_id: VERIFICATION_IDS.V010,
    user_id: MOCK_USER_IDS.USER_5, // 현우
    created_at: hoursAgo(68),
  },

  // ============================================
  // V011 (현우의 운동 루틴) - 지훈, 서연이 응원
  // ============================================
  {
    id: CHEER_IDS.C010,
    verification_id: VERIFICATION_IDS.V011,
    user_id: MOCK_USER_IDS.USER_3, // 지훈
    created_at: hoursAgo(65),
  },
  {
    id: CHEER_IDS.C011,
    verification_id: VERIFICATION_IDS.V011,
    user_id: MOCK_USER_IDS.USER_4, // 서연
    created_at: hoursAgo(64),
  },

  // ============================================
  // V012 (서연의 식단 기록) - 지훈, 현우가 응원
  // ============================================
  {
    id: CHEER_IDS.C012,
    verification_id: VERIFICATION_IDS.V012,
    user_id: MOCK_USER_IDS.USER_3, // 지훈
    created_at: hoursAgo(90),
  },
  {
    id: CHEER_IDS.C013,
    verification_id: VERIFICATION_IDS.V012,
    user_id: MOCK_USER_IDS.USER_5, // 현우
    created_at: hoursAgo(88),
  },

  // ============================================
  // V013 (지훈의 만보 걷기) - 현우가 응원
  // ============================================
  {
    id: CHEER_IDS.C014,
    verification_id: VERIFICATION_IDS.V013,
    user_id: MOCK_USER_IDS.USER_5, // 현우
    created_at: hoursAgo(85),
  },

  // ============================================
  // V014 (수현의 아침 운동) - 민지가 응원
  // ============================================
  {
    id: CHEER_IDS.C015,
    verification_id: VERIFICATION_IDS.V014,
    user_id: MOCK_USER_IDS.USER_1, // 민지
    created_at: hoursAgo(115),
  },
];

// ============================================
// 헬퍼 함수
// ============================================

/**
 * 인증의 응원 목록 조회
 * @param verificationId - 인증 ID
 * @returns 응원 목록
 */
export function getMockCheersForVerification(verificationId: string): Cheer[] {
  return MOCK_CHEERS.filter((c) => c.verification_id === verificationId);
}

/**
 * 인증의 응원 수 조회
 * @param verificationId - 인증 ID
 * @returns 응원 수
 */
export function getMockCheerCountForVerification(
  verificationId: string
): number {
  return MOCK_CHEERS.filter((c) => c.verification_id === verificationId).length;
}

/**
 * 사용자가 해당 인증에 응원했는지 확인
 * @param verificationId - 인증 ID
 * @param userId - 사용자 ID
 * @returns 응원 여부
 */
export function hasMockUserCheered(
  verificationId: string,
  userId: string
): boolean {
  return MOCK_CHEERS.some(
    (c) => c.verification_id === verificationId && c.user_id === userId
  );
}

/**
 * 사용자가 보낸 응원 목록 조회
 * @param userId - 사용자 ID
 * @returns 응원 목록
 */
export function getMockCheersByUser(userId: string): Cheer[] {
  return MOCK_CHEERS.filter((c) => c.user_id === userId);
}

/**
 * 사용자가 받은 응원 목록 조회 (자신의 인증에 대한 응원)
 * @param userId - 사용자 ID
 * @param userVerificationIds - 사용자의 인증 ID 목록
 * @returns 응원 목록
 */
export function getMockCheersReceivedByUser(
  userVerificationIds: string[]
): Cheer[] {
  return MOCK_CHEERS.filter((c) =>
    userVerificationIds.includes(c.verification_id)
  );
}
