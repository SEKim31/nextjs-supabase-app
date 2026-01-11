// Mock 미션 데이터

import type {
  Mission,
  MissionStatus,
  Verification,
} from "@/lib/types/database";
import { RepeatType, VerificationType } from "@/lib/types/enums";

import {
  daysAgo,
  MOCK_GROUP_IDS,
  MOCK_MISSION_IDS,
  MOCK_USER_IDS,
} from "./helpers";

// ============================================
// Mock 미션 데이터 (총 12개)
// ============================================

/**
 * Mock 미션 목록
 * - 커플 그룹: 4개 미션
 * - 가족 그룹: 4개 미션
 * - 친구 그룹: 4개 미션
 */
export const MOCK_MISSIONS: Mission[] = [
  // ============================================
  // 커플 그룹 미션 (GROUP_1)
  // ============================================
  {
    id: MOCK_MISSION_IDS.MISSION_1,
    group_id: MOCK_GROUP_IDS.GROUP_1,
    title: "굿모닝 인증",
    description: "아침에 일어나면 서로에게 인증 사진 보내기",
    repeat_type: RepeatType.DAILY,
    repeat_days: null,
    verification_type: VerificationType.PHOTO,
    created_by: MOCK_USER_IDS.USER_1, // 민지
    is_active: true,
    created_at: daysAgo(20),
    updated_at: daysAgo(1),
  },
  {
    id: MOCK_MISSION_IDS.MISSION_2,
    group_id: MOCK_GROUP_IDS.GROUP_1,
    title: "하루 감사 일기",
    description: "오늘 하루 감사한 일 3가지 적기",
    repeat_type: RepeatType.DAILY,
    repeat_days: null,
    verification_type: VerificationType.TEXT,
    created_by: MOCK_USER_IDS.USER_2, // 수현
    is_active: true,
    created_at: daysAgo(18),
    updated_at: daysAgo(0),
  },
  {
    id: MOCK_MISSION_IDS.MISSION_3,
    group_id: MOCK_GROUP_IDS.GROUP_1,
    title: "물 8잔 마시기",
    description: "건강을 위해 하루 8잔 물 마시기",
    repeat_type: RepeatType.DAILY,
    repeat_days: null,
    verification_type: VerificationType.CHECKLIST,
    created_by: MOCK_USER_IDS.USER_1, // 민지
    is_active: true,
    created_at: daysAgo(15),
    updated_at: daysAgo(2),
  },
  {
    id: MOCK_MISSION_IDS.MISSION_4,
    group_id: MOCK_GROUP_IDS.GROUP_1,
    title: "함께 산책하기",
    description: "주말마다 함께 30분 이상 산책하기",
    repeat_type: RepeatType.SPECIFIC_DAYS,
    repeat_days: [0, 6], // 일요일, 토요일
    verification_type: VerificationType.PHOTO,
    created_by: MOCK_USER_IDS.USER_2, // 수현
    is_active: true,
    created_at: daysAgo(12),
    updated_at: daysAgo(0),
  },

  // ============================================
  // 가족 그룹 미션 (GROUP_2)
  // ============================================
  {
    id: MOCK_MISSION_IDS.MISSION_5,
    group_id: MOCK_GROUP_IDS.GROUP_2,
    title: "아침 운동 10분",
    description: "아침에 일어나서 간단한 스트레칭이나 운동하기",
    repeat_type: RepeatType.DAILY,
    repeat_days: null,
    verification_type: VerificationType.PHOTO,
    created_by: MOCK_USER_IDS.USER_1, // 민지
    is_active: true,
    created_at: daysAgo(18),
    updated_at: daysAgo(1),
  },
  {
    id: MOCK_MISSION_IDS.MISSION_6,
    group_id: MOCK_GROUP_IDS.GROUP_2,
    title: "독서 30분",
    description: "하루 30분 이상 책 읽기",
    repeat_type: RepeatType.SPECIFIC_DAYS,
    repeat_days: [1, 2, 3, 4, 5], // 월~금
    verification_type: VerificationType.TEXT,
    created_by: MOCK_USER_IDS.USER_3, // 지훈
    is_active: true,
    created_at: daysAgo(15),
    updated_at: daysAgo(0),
  },
  {
    id: MOCK_MISSION_IDS.MISSION_7,
    group_id: MOCK_GROUP_IDS.GROUP_2,
    title: "비타민 챙기기",
    description: "매일 비타민 복용 체크하기",
    repeat_type: RepeatType.DAILY,
    repeat_days: null,
    verification_type: VerificationType.CHECKLIST,
    created_by: MOCK_USER_IDS.USER_4, // 서연
    is_active: true,
    created_at: daysAgo(14),
    updated_at: daysAgo(1),
  },
  {
    id: MOCK_MISSION_IDS.MISSION_8,
    group_id: MOCK_GROUP_IDS.GROUP_2,
    title: "가족 식사 인증",
    description: "주말 저녁은 가족과 함께 식사하기",
    repeat_type: RepeatType.SPECIFIC_DAYS,
    repeat_days: [0, 6], // 일요일, 토요일
    verification_type: VerificationType.PHOTO,
    created_by: MOCK_USER_IDS.USER_1, // 민지
    is_active: true,
    created_at: daysAgo(10),
    updated_at: daysAgo(2),
  },

  // ============================================
  // 친구 그룹 미션 (GROUP_3)
  // ============================================
  {
    id: MOCK_MISSION_IDS.MISSION_9,
    group_id: MOCK_GROUP_IDS.GROUP_3,
    title: "헬스장 인증",
    description: "오늘의 운동 인증샷 올리기",
    repeat_type: RepeatType.SPECIFIC_DAYS,
    repeat_days: [1, 3, 5], // 월, 수, 금
    verification_type: VerificationType.PHOTO,
    created_by: MOCK_USER_IDS.USER_3, // 지훈
    is_active: true,
    created_at: daysAgo(12),
    updated_at: daysAgo(0),
  },
  {
    id: MOCK_MISSION_IDS.MISSION_10,
    group_id: MOCK_GROUP_IDS.GROUP_3,
    title: "식단 기록",
    description: "오늘 먹은 식단 기록하기",
    repeat_type: RepeatType.DAILY,
    repeat_days: null,
    verification_type: VerificationType.TEXT,
    created_by: MOCK_USER_IDS.USER_4, // 서연
    is_active: true,
    created_at: daysAgo(10),
    updated_at: daysAgo(1),
  },
  {
    id: MOCK_MISSION_IDS.MISSION_11,
    group_id: MOCK_GROUP_IDS.GROUP_3,
    title: "운동 루틴 체크",
    description: "오늘의 운동 루틴 완료하기",
    repeat_type: RepeatType.SPECIFIC_DAYS,
    repeat_days: [1, 2, 3, 4, 5], // 월~금
    verification_type: VerificationType.CHECKLIST,
    created_by: MOCK_USER_IDS.USER_5, // 현우
    is_active: true,
    created_at: daysAgo(8),
    updated_at: daysAgo(0),
  },
  {
    id: MOCK_MISSION_IDS.MISSION_12,
    group_id: MOCK_GROUP_IDS.GROUP_3,
    title: "만보 걷기",
    description: "하루 10,000보 걷기 인증",
    repeat_type: RepeatType.DAILY,
    repeat_days: null,
    verification_type: VerificationType.PHOTO,
    created_by: MOCK_USER_IDS.USER_3, // 지훈
    is_active: true,
    created_at: daysAgo(5),
    updated_at: daysAgo(0),
  },
];

// ============================================
// MissionStatus 타입 데이터 (대시보드용)
// ============================================

/**
 * 오늘의 미션 상태 데이터 생성
 * 실제로는 verifications 데이터와 연동하여 동적으로 생성됨
 * 여기서는 시뮬레이션을 위해 하드코딩
 */
export function getMockMissionStatuses(userId: string): MissionStatus[] {
  // 사용자가 속한 그룹의 미션만 필터링
  // 여기서는 간단히 현재 사용자(민지)가 속한 그룹 1, 2의 미션만
  const userMissions = MOCK_MISSIONS.filter(
    (m) =>
      m.group_id === MOCK_GROUP_IDS.GROUP_1 ||
      m.group_id === MOCK_GROUP_IDS.GROUP_2
  );

  // 임의로 일부 미션을 완료 상태로 설정
  const completedMissionIds: string[] = [
    MOCK_MISSION_IDS.MISSION_1, // 굿모닝 인증
    MOCK_MISSION_IDS.MISSION_5, // 아침 운동
  ];

  return userMissions.map((mission) => ({
    ...mission,
    is_completed_today: completedMissionIds.includes(mission.id),
    today_verification: completedMissionIds.includes(mission.id)
      ? createDummyVerification(mission.id, userId)
      : null,
  }));
}

/**
 * 더미 인증 데이터 생성 (MissionStatus용)
 */
function createDummyVerification(
  missionId: string,
  userId: string
): Verification {
  return {
    id: `dummy-${missionId}`,
    mission_id: missionId,
    user_id: userId,
    verified_at: new Date().toISOString(),
    image_url: null,
    text_content: null,
    checklist_items: null,
    created_at: new Date().toISOString(),
  };
}

// ============================================
// 헬퍼 함수
// ============================================

/**
 * ID로 미션 조회
 * @param id - 미션 ID
 * @returns 미션 객체 또는 undefined
 */
export function getMockMissionById(id: string): Mission | undefined {
  return MOCK_MISSIONS.find((mission) => mission.id === id);
}

/**
 * 그룹의 미션 목록 조회
 * @param groupId - 그룹 ID
 * @returns 미션 목록
 */
export function getMockMissionsForGroup(groupId: string): Mission[] {
  return MOCK_MISSIONS.filter((mission) => mission.group_id === groupId);
}

/**
 * 활성 미션만 조회
 * @param groupId - 그룹 ID
 * @returns 활성 미션 목록
 */
export function getMockActiveMissionsForGroup(groupId: string): Mission[] {
  return MOCK_MISSIONS.filter(
    (mission) => mission.group_id === groupId && mission.is_active
  );
}

/**
 * 오늘 수행해야 할 미션 조회
 * @param groupId - 그룹 ID
 * @returns 오늘 수행할 미션 목록
 */
export function getMockTodayMissionsForGroup(groupId: string): Mission[] {
  const today = new Date().getDay(); // 0 = 일요일, 6 = 토요일

  return MOCK_MISSIONS.filter((mission) => {
    if (mission.group_id !== groupId || !mission.is_active) return false;

    if (mission.repeat_type === RepeatType.DAILY) return true;

    if (
      mission.repeat_type === RepeatType.SPECIFIC_DAYS &&
      mission.repeat_days
    ) {
      return mission.repeat_days.includes(today);
    }

    return false;
  });
}
