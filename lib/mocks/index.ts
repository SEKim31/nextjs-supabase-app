// Mock 데이터 통합 Export
// 사용법: import { MOCK_USERS, MOCK_GROUPS } from '@/lib/mocks';

import type {
  VerificationWithCheers,
  VerificationWithUser,
} from "@/lib/types/database";

import { MOCK_CHEERS } from "./cheers";
import { MOCK_CURRENT_USER_ID, MOCK_GROUP_IDS, MOCK_USER_IDS } from "./helpers";
import { MOCK_MISSIONS } from "./missions";
import { createVerificationFeeds, MOCK_VERIFICATIONS } from "./verifications";

// ============================================
// 헬퍼 함수 및 상수
// ============================================
export {
  // ID 상수
  MOCK_USER_IDS,
  MOCK_GROUP_IDS,
  MOCK_MISSION_IDS,
  MOCK_GROUP_MEMBER_IDS,
  MOCK_INVITE_IDS,
  MOCK_CURRENT_USER_ID,
  // 날짜 유틸리티
  daysAgo,
  hoursAgo,
  minutesAgo,
  dateAtTime,
  // ID 생성 함수
  generateVerificationId,
  generateCheerId,
  generateNotificationId,
} from "./helpers";

// ============================================
// 사용자 데이터
// ============================================
export {
  MOCK_USERS,
  getMockUserById,
  getCurrentMockUser,
  getMockUserByNickname,
} from "./users";

// ============================================
// 그룹 데이터
// ============================================
export {
  MOCK_GROUPS,
  MOCK_GROUP_MEMBERS,
  MOCK_GROUP_INVITES,
  MOCK_GROUP_CARDS,
  MOCK_GROUPS_WITH_MEMBERS,
  getMockGroupById,
  getMockGroupsForUser,
  getMockGroupCardsForUser,
  getMockMembersForGroup,
  getMockInviteForGroup,
} from "./groups";

// ============================================
// 미션 데이터
// ============================================
export {
  MOCK_MISSIONS,
  getMockMissionStatuses,
  getMockMissionById,
  getMockMissionsForGroup,
  getMockActiveMissionsForGroup,
  getMockTodayMissionsForGroup,
} from "./missions";

// ============================================
// 인증 데이터
// ============================================
export {
  MOCK_VERIFICATIONS,
  createVerificationFeeds,
  getMockVerificationById,
  getMockVerificationsForMission,
  getMockVerificationsForUser,
  getMockVerificationFeedForGroup,
  getMockTodayVerification,
} from "./verifications";

// ============================================
// 응원 데이터
// ============================================
export {
  MOCK_CHEERS,
  getMockCheersForVerification,
  getMockCheerCountForVerification,
  hasMockUserCheered,
  getMockCheersByUser,
  getMockCheersReceivedByUser,
} from "./cheers";

// ============================================
// 알림 데이터
// ============================================
export {
  MOCK_NOTIFICATIONS,
  getMockNotificationsForUser,
  getMockUnreadNotificationCount,
  getMockUnreadNotifications,
  getMockNotificationsByType,
} from "./notifications";

// ============================================
// 조합 데이터 (VerificationFeed용)
// ============================================

/**
 * VerificationFeed 컴포넌트에서 바로 사용할 수 있는 데이터
 * 인증 + 사용자 정보 + 응원 정보가 모두 포함됨
 */
export const MOCK_VERIFICATION_FEEDS: (VerificationWithUser &
  VerificationWithCheers)[] = createVerificationFeeds(
  MOCK_VERIFICATIONS,
  MOCK_CHEERS
);

/**
 * 현재 로그인 사용자 ID 반환
 * @returns 현재 사용자 ID
 */
export function getCurrentUserId(): string {
  return MOCK_CURRENT_USER_ID;
}

// ============================================
// 통계 데이터 (Stats용)
// ============================================

/**
 * 주간 달성률 데이터 (하드코딩)
 */
export const MOCK_WEEKLY_STATS = {
  [MOCK_GROUP_IDS.GROUP_1]: {
    groupId: MOCK_GROUP_IDS.GROUP_1,
    groupName: "우리 둘만의 공간",
    weeklyRates: [0.8, 0.75, 1.0, 0.5, 0.75, 0.0, 0.0], // 일~토
    totalVerifications: 12,
    totalCheers: 8,
  },
  [MOCK_GROUP_IDS.GROUP_2]: {
    groupId: MOCK_GROUP_IDS.GROUP_2,
    groupName: "행복한 우리 가족",
    weeklyRates: [0.6, 0.5, 0.75, 0.25, 0.5, 0.0, 0.0],
    totalVerifications: 18,
    totalCheers: 10,
  },
  [MOCK_GROUP_IDS.GROUP_3]: {
    groupId: MOCK_GROUP_IDS.GROUP_3,
    groupName: "운동 친구들",
    weeklyRates: [0.33, 0.67, 0.33, 1.0, 0.33, 0.0, 0.0],
    totalVerifications: 8,
    totalCheers: 6,
  },
};

/**
 * 개인 스트릭 데이터 (하드코딩)
 */
export const MOCK_USER_STREAKS = {
  [MOCK_USER_IDS.USER_1]: {
    currentStreak: 5,
    longestStreak: 12,
    totalVerifications: 28,
    totalCheersReceived: 15,
    totalCheersSent: 12,
  },
  [MOCK_USER_IDS.USER_2]: {
    currentStreak: 3,
    longestStreak: 8,
    totalVerifications: 22,
    totalCheersReceived: 10,
    totalCheersSent: 14,
  },
  [MOCK_USER_IDS.USER_3]: {
    currentStreak: 7,
    longestStreak: 15,
    totalVerifications: 35,
    totalCheersReceived: 18,
    totalCheersSent: 20,
  },
  [MOCK_USER_IDS.USER_4]: {
    currentStreak: 2,
    longestStreak: 6,
    totalVerifications: 15,
    totalCheersReceived: 8,
    totalCheersSent: 16,
  },
  [MOCK_USER_IDS.USER_5]: {
    currentStreak: 4,
    longestStreak: 10,
    totalVerifications: 20,
    totalCheersReceived: 12,
    totalCheersSent: 8,
  },
};

/**
 * 오늘의 현황 데이터 조회
 * @param userId - 사용자 ID
 * @returns 오늘의 현황
 */
export function getMockTodayStatus(userId: string) {
  // 사용자가 속한 그룹의 미션 중 오늘 수행할 미션
  const userMissions = MOCK_MISSIONS.filter((m) => {
    // 간단히 GROUP_1, GROUP_2에 속한 것으로 가정 (민지의 경우)
    if (userId === MOCK_USER_IDS.USER_1) {
      return (
        m.group_id === MOCK_GROUP_IDS.GROUP_1 ||
        m.group_id === MOCK_GROUP_IDS.GROUP_2
      );
    }
    return false;
  });

  // 하드코딩된 완료 미션
  const completedCount = 2;
  const totalCount = userMissions.length;

  return {
    completedMissions: completedCount,
    totalMissions: totalCount,
    completionRate: totalCount > 0 ? completedCount / totalCount : 0,
    pendingMissions: totalCount - completedCount,
  };
}
