// Mock 그룹 데이터

import type {
  Group,
  GroupCardData,
  GroupInvite,
  GroupMember,
  GroupWithMembers,
} from "@/lib/types/database";
import { RelationshipType } from "@/lib/types/enums";

import {
  daysAgo,
  MOCK_GROUP_IDS,
  MOCK_GROUP_MEMBER_IDS,
  MOCK_INVITE_IDS,
  MOCK_USER_IDS,
} from "./helpers";
import { getMockUserById, MOCK_USERS } from "./users";

// ============================================
// Mock 그룹 데이터 (3개)
// ============================================

/**
 * Mock 그룹 목록
 * - GROUP_1: 커플 그룹 (민지 & 수현)
 * - GROUP_2: 가족 그룹 (민지, 수현, 지훈, 서연)
 * - GROUP_3: 친구 그룹 (지훈, 서연, 현우)
 */
export const MOCK_GROUPS: Group[] = [
  {
    id: MOCK_GROUP_IDS.GROUP_1,
    name: "우리 둘만의 공간",
    description: "매일 서로를 응원하며 좋은 습관 만들기",
    relationship_type: RelationshipType.COUPLE,
    owner_id: MOCK_USER_IDS.USER_1, // 민지
    created_at: daysAgo(25),
    updated_at: daysAgo(1),
  },
  {
    id: MOCK_GROUP_IDS.GROUP_2,
    name: "행복한 우리 가족",
    description: "가족 모두 건강하게! 함께하는 습관 챌린지",
    relationship_type: RelationshipType.FAMILY,
    owner_id: MOCK_USER_IDS.USER_1, // 민지
    created_at: daysAgo(20),
    updated_at: daysAgo(2),
  },
  {
    id: MOCK_GROUP_IDS.GROUP_3,
    name: "운동 친구들",
    description: "오늘도 열심히 운동하자!",
    relationship_type: RelationshipType.FRIENDS,
    owner_id: MOCK_USER_IDS.USER_3, // 지훈
    created_at: daysAgo(15),
    updated_at: daysAgo(0),
  },
];

// ============================================
// Mock 그룹 멤버 데이터
// ============================================

/**
 * Mock 그룹 멤버 목록
 */
export const MOCK_GROUP_MEMBERS: GroupMember[] = [
  // 커플 그룹 (2명: 민지, 수현)
  {
    id: MOCK_GROUP_MEMBER_IDS.GM_1,
    group_id: MOCK_GROUP_IDS.GROUP_1,
    user_id: MOCK_USER_IDS.USER_1, // 민지
    joined_at: daysAgo(25),
  },
  {
    id: MOCK_GROUP_MEMBER_IDS.GM_2,
    group_id: MOCK_GROUP_IDS.GROUP_1,
    user_id: MOCK_USER_IDS.USER_2, // 수현
    joined_at: daysAgo(24),
  },
  // 가족 그룹 (4명: 민지, 수현, 지훈, 서연)
  {
    id: MOCK_GROUP_MEMBER_IDS.GM_3,
    group_id: MOCK_GROUP_IDS.GROUP_2,
    user_id: MOCK_USER_IDS.USER_1, // 민지
    joined_at: daysAgo(20),
  },
  {
    id: MOCK_GROUP_MEMBER_IDS.GM_4,
    group_id: MOCK_GROUP_IDS.GROUP_2,
    user_id: MOCK_USER_IDS.USER_2, // 수현
    joined_at: daysAgo(19),
  },
  {
    id: MOCK_GROUP_MEMBER_IDS.GM_5,
    group_id: MOCK_GROUP_IDS.GROUP_2,
    user_id: MOCK_USER_IDS.USER_3, // 지훈
    joined_at: daysAgo(18),
  },
  {
    id: MOCK_GROUP_MEMBER_IDS.GM_6,
    group_id: MOCK_GROUP_IDS.GROUP_2,
    user_id: MOCK_USER_IDS.USER_4, // 서연
    joined_at: daysAgo(17),
  },
  // 친구 그룹 (3명: 지훈, 서연, 현우)
  {
    id: MOCK_GROUP_MEMBER_IDS.GM_7,
    group_id: MOCK_GROUP_IDS.GROUP_3,
    user_id: MOCK_USER_IDS.USER_3, // 지훈
    joined_at: daysAgo(15),
  },
  {
    id: MOCK_GROUP_MEMBER_IDS.GM_8,
    group_id: MOCK_GROUP_IDS.GROUP_3,
    user_id: MOCK_USER_IDS.USER_4, // 서연
    joined_at: daysAgo(14),
  },
  {
    id: MOCK_GROUP_MEMBER_IDS.GM_9,
    group_id: MOCK_GROUP_IDS.GROUP_3,
    user_id: MOCK_USER_IDS.USER_5, // 현우
    joined_at: daysAgo(13),
  },
];

// ============================================
// Mock 초대 링크 데이터
// ============================================

/**
 * Mock 초대 링크 목록
 */
export const MOCK_GROUP_INVITES: GroupInvite[] = [
  {
    id: MOCK_INVITE_IDS.INVITE_1,
    group_id: MOCK_GROUP_IDS.GROUP_1,
    token: "couple-invite-token-abc123",
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7일 후
    created_by: MOCK_USER_IDS.USER_1,
    created_at: daysAgo(1),
  },
  {
    id: MOCK_INVITE_IDS.INVITE_2,
    group_id: MOCK_GROUP_IDS.GROUP_2,
    token: "family-invite-token-def456",
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    created_by: MOCK_USER_IDS.USER_1,
    created_at: daysAgo(2),
  },
  {
    id: MOCK_INVITE_IDS.INVITE_3,
    group_id: MOCK_GROUP_IDS.GROUP_3,
    token: "friends-invite-token-ghi789",
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    created_by: MOCK_USER_IDS.USER_3,
    created_at: daysAgo(0),
  },
];

// ============================================
// GroupCard 컴포넌트용 데이터
// ============================================

/**
 * GroupCard 컴포넌트에서 사용할 데이터
 */
export const MOCK_GROUP_CARDS: GroupCardData[] = MOCK_GROUPS.map((group) => {
  const memberCount = MOCK_GROUP_MEMBERS.filter(
    (m) => m.group_id === group.id
  ).length;

  // 오늘의 달성률 (하드코딩)
  const completionRates: Record<string, number> = {
    [MOCK_GROUP_IDS.GROUP_1]: 0.75, // 75%
    [MOCK_GROUP_IDS.GROUP_2]: 0.5, // 50%
    [MOCK_GROUP_IDS.GROUP_3]: 0.33, // 33%
  };

  return {
    ...group,
    member_count: memberCount,
    today_completion_rate: completionRates[group.id] || 0,
  };
});

// ============================================
// GroupWithMembers 타입 데이터
// ============================================

/**
 * 그룹 + 멤버 정보가 포함된 데이터
 */
export const MOCK_GROUPS_WITH_MEMBERS: GroupWithMembers[] = MOCK_GROUPS.map(
  (group) => {
    const members = MOCK_GROUP_MEMBERS.filter(
      (m) => m.group_id === group.id
    ).map((member) => ({
      ...member,
      user: getMockUserById(member.user_id) || MOCK_USERS[0],
    }));

    return {
      ...group,
      members,
    };
  }
);

// ============================================
// 헬퍼 함수
// ============================================

/**
 * ID로 그룹 조회
 * @param id - 그룹 ID
 * @returns 그룹 객체 또는 undefined
 */
export function getMockGroupById(id: string): Group | undefined {
  return MOCK_GROUPS.find((group) => group.id === id);
}

/**
 * 사용자가 속한 그룹 목록 조회
 * @param userId - 사용자 ID
 * @returns 그룹 목록
 */
export function getMockGroupsForUser(userId: string): Group[] {
  const memberGroupIds = MOCK_GROUP_MEMBERS.filter(
    (m) => m.user_id === userId
  ).map((m) => m.group_id);

  return MOCK_GROUPS.filter((group) => memberGroupIds.includes(group.id));
}

/**
 * 사용자가 속한 그룹 카드 데이터 조회
 * @param userId - 사용자 ID
 * @returns GroupCardData 목록
 */
export function getMockGroupCardsForUser(userId: string): GroupCardData[] {
  const memberGroupIds = MOCK_GROUP_MEMBERS.filter(
    (m) => m.user_id === userId
  ).map((m) => m.group_id);

  return MOCK_GROUP_CARDS.filter((group) => memberGroupIds.includes(group.id));
}

/**
 * 그룹의 멤버 목록 조회
 * @param groupId - 그룹 ID
 * @returns 멤버 목록 (사용자 정보 포함)
 */
export function getMockMembersForGroup(
  groupId: string
): (GroupMember & { user: (typeof MOCK_USERS)[0] })[] {
  return MOCK_GROUP_MEMBERS.filter((m) => m.group_id === groupId).map(
    (member) => ({
      ...member,
      user: getMockUserById(member.user_id) || MOCK_USERS[0],
    })
  );
}

/**
 * 그룹의 초대 링크 조회
 * @param groupId - 그룹 ID
 * @returns 초대 링크 또는 undefined
 */
export function getMockInviteForGroup(
  groupId: string
): GroupInvite | undefined {
  return MOCK_GROUP_INVITES.find((invite) => invite.group_id === groupId);
}
