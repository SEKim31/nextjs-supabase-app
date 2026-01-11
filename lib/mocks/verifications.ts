// Mock 인증 데이터

import type {
  ChecklistItem,
  Verification,
  VerificationWithCheers,
  VerificationWithUser,
} from "@/lib/types/database";

import { dateAtTime, MOCK_MISSION_IDS, MOCK_USER_IDS } from "./helpers";
import { getMockUserById, MOCK_USERS } from "./users";

// ============================================
// 인증 ID 상수 (하드코딩)
// ============================================

const VERIFICATION_IDS = {
  V001: "11111111-1111-4111-a111-111111111111",
  V002: "22222222-2222-4222-a222-222222222222",
  V003: "33333333-3333-4333-a333-333333333333",
  V004: "44444444-4444-4444-a444-444444444444",
  V005: "55555555-5555-4555-a555-555555555555",
  V006: "66666666-6666-4666-a666-666666666666",
  V007: "77777777-7777-4777-a777-777777777777",
  V008: "88888888-8888-4888-a888-888888888888",
  V009: "99999999-9999-4999-a999-999999999999",
  V010: "aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa",
  V011: "bbbbbbbb-bbbb-4bbb-abbb-bbbbbbbbbbbb",
  V012: "cccccccc-cccc-4ccc-accc-cccccccccccc",
  V013: "dddddddd-dddd-4ddd-addd-dddddddddddd",
  V014: "eeeeeeee-eeee-4eee-aeee-eeeeeeeeeeee",
  V015: "ffffffff-ffff-4fff-afff-ffffffffffff",
  V016: "11111111-2222-4333-a444-555555555555",
  V017: "22222222-3333-4444-a555-666666666666",
  V018: "33333333-4444-4555-a666-777777777777",
  V019: "44444444-5555-4666-a777-888888888888",
  V020: "55555555-6666-4777-a888-999999999999",
} as const;

// ============================================
// 체크리스트 아이템 샘플
// ============================================

const WATER_CHECKLIST: ChecklistItem[] = [
  { id: "w1", label: "아침 기상 후 1잔", checked: true },
  { id: "w2", label: "아침 식사 후 1잔", checked: true },
  { id: "w3", label: "오전 중 1잔", checked: true },
  { id: "w4", label: "점심 식사 후 1잔", checked: true },
  { id: "w5", label: "오후 중 1잔", checked: true },
  { id: "w6", label: "저녁 식사 후 1잔", checked: true },
  { id: "w7", label: "저녁 중 1잔", checked: false },
  { id: "w8", label: "취침 전 1잔", checked: false },
];

const VITAMIN_CHECKLIST: ChecklistItem[] = [
  { id: "v1", label: "종합 비타민", checked: true },
  { id: "v2", label: "비타민 D", checked: true },
  { id: "v3", label: "오메가 3", checked: false },
];

const EXERCISE_CHECKLIST: ChecklistItem[] = [
  { id: "e1", label: "스쿼트 3세트", checked: true },
  { id: "e2", label: "플랭크 1분", checked: true },
  { id: "e3", label: "팔굽혀펴기 3세트", checked: true },
  { id: "e4", label: "런지 3세트", checked: false },
  { id: "e5", label: "스트레칭 5분", checked: true },
];

// ============================================
// Mock 인증 데이터 (최근 7일)
// ============================================

/**
 * Mock 인증 목록
 * 최근 7일간의 다양한 인증 데이터
 */
export const MOCK_VERIFICATIONS: Verification[] = [
  // ============================================
  // 오늘 (0일 전) 인증
  // ============================================
  {
    id: VERIFICATION_IDS.V001,
    mission_id: MOCK_MISSION_IDS.MISSION_1, // 굿모닝 인증 (사진)
    user_id: MOCK_USER_IDS.USER_1, // 민지
    verified_at: dateAtTime(0, 7, 30),
    image_url: "https://picsum.photos/seed/morning1/400/300",
    text_content: null,
    checklist_items: null,
    created_at: dateAtTime(0, 7, 30),
  },
  {
    id: VERIFICATION_IDS.V002,
    mission_id: MOCK_MISSION_IDS.MISSION_1, // 굿모닝 인증 (사진)
    user_id: MOCK_USER_IDS.USER_2, // 수현
    verified_at: dateAtTime(0, 8, 15),
    image_url: "https://picsum.photos/seed/morning2/400/300",
    text_content: null,
    checklist_items: null,
    created_at: dateAtTime(0, 8, 15),
  },
  {
    id: VERIFICATION_IDS.V003,
    mission_id: MOCK_MISSION_IDS.MISSION_5, // 아침 운동 (사진)
    user_id: MOCK_USER_IDS.USER_1, // 민지
    verified_at: dateAtTime(0, 6, 45),
    image_url: "https://picsum.photos/seed/exercise1/400/300",
    text_content: null,
    checklist_items: null,
    created_at: dateAtTime(0, 6, 45),
  },
  {
    id: VERIFICATION_IDS.V004,
    mission_id: MOCK_MISSION_IDS.MISSION_3, // 물 8잔 (체크리스트)
    user_id: MOCK_USER_IDS.USER_1, // 민지
    verified_at: dateAtTime(0, 21, 0),
    image_url: null,
    text_content: null,
    checklist_items: WATER_CHECKLIST,
    created_at: dateAtTime(0, 21, 0),
  },

  // ============================================
  // 1일 전 인증
  // ============================================
  {
    id: VERIFICATION_IDS.V005,
    mission_id: MOCK_MISSION_IDS.MISSION_2, // 감사 일기 (텍스트)
    user_id: MOCK_USER_IDS.USER_1, // 민지
    verified_at: dateAtTime(-1, 22, 0),
    image_url: null,
    text_content:
      "오늘 감사한 일:\n1. 맛있는 점심을 먹을 수 있어서 감사해요\n2. 수현이가 커피를 사줘서 감사해요\n3. 날씨가 좋아서 산책할 수 있어서 감사해요",
    checklist_items: null,
    created_at: dateAtTime(-1, 22, 0),
  },
  {
    id: VERIFICATION_IDS.V006,
    mission_id: MOCK_MISSION_IDS.MISSION_2, // 감사 일기 (텍스트)
    user_id: MOCK_USER_IDS.USER_2, // 수현
    verified_at: dateAtTime(-1, 23, 30),
    image_url: null,
    text_content:
      "오늘의 감사:\n1. 건강하게 하루를 보낼 수 있어서\n2. 민지와 함께해서\n3. 새로운 것을 배울 수 있어서",
    checklist_items: null,
    created_at: dateAtTime(-1, 23, 30),
  },
  {
    id: VERIFICATION_IDS.V007,
    mission_id: MOCK_MISSION_IDS.MISSION_7, // 비타민 (체크리스트)
    user_id: MOCK_USER_IDS.USER_4, // 서연
    verified_at: dateAtTime(-1, 8, 0),
    image_url: null,
    text_content: null,
    checklist_items: VITAMIN_CHECKLIST,
    created_at: dateAtTime(-1, 8, 0),
  },

  // ============================================
  // 2일 전 인증
  // ============================================
  {
    id: VERIFICATION_IDS.V008,
    mission_id: MOCK_MISSION_IDS.MISSION_1, // 굿모닝 인증
    user_id: MOCK_USER_IDS.USER_1,
    verified_at: dateAtTime(-2, 7, 0),
    image_url: "https://picsum.photos/seed/morning3/400/300",
    text_content: null,
    checklist_items: null,
    created_at: dateAtTime(-2, 7, 0),
  },
  {
    id: VERIFICATION_IDS.V009,
    mission_id: MOCK_MISSION_IDS.MISSION_6, // 독서 30분 (텍스트)
    user_id: MOCK_USER_IDS.USER_3, // 지훈
    verified_at: dateAtTime(-2, 21, 30),
    image_url: null,
    text_content:
      "오늘 읽은 책: '원씽'\n인상 깊었던 구절: 성공은 한 가지에 집중할 때 온다.\n내일도 계속 읽을 예정!",
    checklist_items: null,
    created_at: dateAtTime(-2, 21, 30),
  },

  // ============================================
  // 3일 전 인증
  // ============================================
  {
    id: VERIFICATION_IDS.V010,
    mission_id: MOCK_MISSION_IDS.MISSION_9, // 헬스장 인증
    user_id: MOCK_USER_IDS.USER_3, // 지훈
    verified_at: dateAtTime(-3, 19, 0),
    image_url: "https://picsum.photos/seed/gym1/400/300",
    text_content: null,
    checklist_items: null,
    created_at: dateAtTime(-3, 19, 0),
  },
  {
    id: VERIFICATION_IDS.V011,
    mission_id: MOCK_MISSION_IDS.MISSION_11, // 운동 루틴 (체크리스트)
    user_id: MOCK_USER_IDS.USER_5, // 현우
    verified_at: dateAtTime(-3, 20, 30),
    image_url: null,
    text_content: null,
    checklist_items: EXERCISE_CHECKLIST,
    created_at: dateAtTime(-3, 20, 30),
  },

  // ============================================
  // 4일 전 인증
  // ============================================
  {
    id: VERIFICATION_IDS.V012,
    mission_id: MOCK_MISSION_IDS.MISSION_10, // 식단 기록
    user_id: MOCK_USER_IDS.USER_4, // 서연
    verified_at: dateAtTime(-4, 20, 0),
    image_url: null,
    text_content:
      "오늘의 식단:\n- 아침: 그릭 요거트, 과일\n- 점심: 닭가슴살 샐러드\n- 저녁: 연어 스테이크, 현미밥",
    checklist_items: null,
    created_at: dateAtTime(-4, 20, 0),
  },
  {
    id: VERIFICATION_IDS.V013,
    mission_id: MOCK_MISSION_IDS.MISSION_12, // 만보 걷기
    user_id: MOCK_USER_IDS.USER_3, // 지훈
    verified_at: dateAtTime(-4, 21, 0),
    image_url: "https://picsum.photos/seed/walk1/400/300",
    text_content: null,
    checklist_items: null,
    created_at: dateAtTime(-4, 21, 0),
  },

  // ============================================
  // 5일 전 인증
  // ============================================
  {
    id: VERIFICATION_IDS.V014,
    mission_id: MOCK_MISSION_IDS.MISSION_5, // 아침 운동
    user_id: MOCK_USER_IDS.USER_2, // 수현
    verified_at: dateAtTime(-5, 7, 0),
    image_url: "https://picsum.photos/seed/exercise2/400/300",
    text_content: null,
    checklist_items: null,
    created_at: dateAtTime(-5, 7, 0),
  },

  // ============================================
  // 6일 전 인증
  // ============================================
  {
    id: VERIFICATION_IDS.V015,
    mission_id: MOCK_MISSION_IDS.MISSION_1, // 굿모닝 인증
    user_id: MOCK_USER_IDS.USER_2, // 수현
    verified_at: dateAtTime(-6, 8, 30),
    image_url: "https://picsum.photos/seed/morning4/400/300",
    text_content: null,
    checklist_items: null,
    created_at: dateAtTime(-6, 8, 30),
  },
  {
    id: VERIFICATION_IDS.V016,
    mission_id: MOCK_MISSION_IDS.MISSION_3, // 물 8잔
    user_id: MOCK_USER_IDS.USER_2, // 수현
    verified_at: dateAtTime(-6, 22, 0),
    image_url: null,
    text_content: null,
    checklist_items: WATER_CHECKLIST.map((item) => ({
      ...item,
      checked: true,
    })),
    created_at: dateAtTime(-6, 22, 0),
  },
];

// ============================================
// VerificationFeed 컴포넌트용 데이터
// ============================================

// 응원 데이터는 cheers.ts에서 import해서 사용
// 여기서는 빈 배열로 초기화하고, 실제 사용 시 조합

/**
 * VerificationFeed 컴포넌트에서 사용할 데이터 생성
 * @param verifications - 인증 목록
 * @param cheers - 응원 목록 (cheers.ts에서 가져옴)
 * @returns VerificationWithUser & VerificationWithCheers 배열
 */
export function createVerificationFeeds(
  verifications: Verification[] = MOCK_VERIFICATIONS,
  cheers: {
    verification_id: string;
    user_id: string;
    id: string;
    created_at: string;
  }[] = []
): (VerificationWithUser & VerificationWithCheers)[] {
  return verifications.map((verification) => {
    const user = getMockUserById(verification.user_id) || MOCK_USERS[0];
    const verificationCheers = cheers.filter(
      (c) => c.verification_id === verification.id
    );

    return {
      ...verification,
      user,
      cheers: verificationCheers,
      cheer_count: verificationCheers.length,
    };
  });
}

// ============================================
// 헬퍼 함수
// ============================================

/**
 * ID로 인증 조회
 * @param id - 인증 ID
 * @returns 인증 객체 또는 undefined
 */
export function getMockVerificationById(id: string): Verification | undefined {
  return MOCK_VERIFICATIONS.find((v) => v.id === id);
}

/**
 * 미션의 인증 목록 조회
 * @param missionId - 미션 ID
 * @returns 인증 목록
 */
export function getMockVerificationsForMission(
  missionId: string
): Verification[] {
  return MOCK_VERIFICATIONS.filter((v) => v.mission_id === missionId);
}

/**
 * 사용자의 인증 목록 조회
 * @param userId - 사용자 ID
 * @returns 인증 목록
 */
export function getMockVerificationsForUser(userId: string): Verification[] {
  return MOCK_VERIFICATIONS.filter((v) => v.user_id === userId);
}

/**
 * 그룹의 인증 피드 조회 (최근 순)
 * @param groupId - 그룹 ID
 * @param missionIds - 해당 그룹의 미션 ID 목록
 * @returns 인증 목록 (최근 순 정렬)
 */
export function getMockVerificationFeedForGroup(
  missionIds: string[]
): Verification[] {
  return MOCK_VERIFICATIONS.filter((v) =>
    missionIds.includes(v.mission_id)
  ).sort(
    (a, b) =>
      new Date(b.verified_at).getTime() - new Date(a.verified_at).getTime()
  );
}

/**
 * 오늘의 인증 조회
 * @param missionId - 미션 ID
 * @param userId - 사용자 ID
 * @returns 오늘의 인증 또는 undefined
 */
export function getMockTodayVerification(
  missionId: string,
  userId: string
): Verification | undefined {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return MOCK_VERIFICATIONS.find((v) => {
    const verifiedDate = new Date(v.verified_at);
    verifiedDate.setHours(0, 0, 0, 0);
    return (
      v.mission_id === missionId &&
      v.user_id === userId &&
      verifiedDate.getTime() === today.getTime()
    );
  });
}

// Export verification IDs for use in cheers.ts
export { VERIFICATION_IDS };
