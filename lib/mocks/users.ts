// Mock 사용자 데이터

import type { User } from "@/lib/types/database";

import { daysAgo, MOCK_USER_IDS } from "./helpers";

// ============================================
// Mock 사용자 데이터 (5명)
// ============================================

/**
 * Mock 사용자 목록
 * - USER_1: 민지 (현재 로그인 사용자)
 * - USER_2: 수현 (민지의 파트너)
 * - USER_3: 지훈 (친구)
 * - USER_4: 서연 (가족/친구)
 * - USER_5: 현우 (친구)
 */
export const MOCK_USERS: User[] = [
  {
    id: MOCK_USER_IDS.USER_1,
    email: "minji@example.com",
    nickname: "민지",
    profile_image_url: null,
    created_at: daysAgo(30),
    updated_at: daysAgo(1),
  },
  {
    id: MOCK_USER_IDS.USER_2,
    email: "suhyun@example.com",
    nickname: "수현",
    profile_image_url: null,
    created_at: daysAgo(28),
    updated_at: daysAgo(2),
  },
  {
    id: MOCK_USER_IDS.USER_3,
    email: "jihun@example.com",
    nickname: "지훈",
    profile_image_url: null,
    created_at: daysAgo(25),
    updated_at: daysAgo(0),
  },
  {
    id: MOCK_USER_IDS.USER_4,
    email: "seoyeon@example.com",
    nickname: "서연",
    profile_image_url: null,
    created_at: daysAgo(20),
    updated_at: daysAgo(3),
  },
  {
    id: MOCK_USER_IDS.USER_5,
    email: "hyunwoo@example.com",
    nickname: "현우",
    profile_image_url: null,
    created_at: daysAgo(15),
    updated_at: daysAgo(1),
  },
];

// ============================================
// 헬퍼 함수
// ============================================

/**
 * ID로 사용자 조회
 * @param id - 사용자 ID
 * @returns 사용자 객체 또는 undefined
 */
export function getMockUserById(id: string): User | undefined {
  return MOCK_USERS.find((user) => user.id === id);
}

/**
 * 현재 로그인한 사용자 조회 (시뮬레이션)
 * @returns 현재 사용자 객체
 */
export function getCurrentMockUser(): User {
  return MOCK_USERS[0]; // 민지
}

/**
 * 닉네임으로 사용자 조회
 * @param nickname - 닉네임
 * @returns 사용자 객체 또는 undefined
 */
export function getMockUserByNickname(nickname: string): User | undefined {
  return MOCK_USERS.find((user) => user.nickname === nickname);
}
