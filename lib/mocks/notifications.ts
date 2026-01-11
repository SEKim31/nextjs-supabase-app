// Mock 알림 데이터

import type { Notification } from "@/lib/types/database";
import { NotificationType } from "@/lib/types/enums";

import { hoursAgo, MOCK_USER_IDS } from "./helpers";

// ============================================
// 알림 ID 상수 (하드코딩)
// ============================================

const NOTIFICATION_IDS = {
  N001: "n0010000-0000-4000-c000-000000000001",
  N002: "n0020000-0000-4000-c000-000000000002",
  N003: "n0030000-0000-4000-c000-000000000003",
  N004: "n0040000-0000-4000-c000-000000000004",
  N005: "n0050000-0000-4000-c000-000000000005",
  N006: "n0060000-0000-4000-c000-000000000006",
  N007: "n0070000-0000-4000-c000-000000000007",
  N008: "n0080000-0000-4000-c000-000000000008",
  N009: "n0090000-0000-4000-c000-000000000009",
  N010: "n0100000-0000-4000-c000-000000000010",
} as const;

// ============================================
// Mock 알림 데이터
// ============================================

/**
 * Mock 알림 목록
 * - CHEER: 응원 알림
 * - REMINDER: 미션 리마인더 알림
 */
export const MOCK_NOTIFICATIONS: Notification[] = [
  // ============================================
  // 민지(USER_1)의 알림
  // ============================================
  {
    id: NOTIFICATION_IDS.N001,
    user_id: MOCK_USER_IDS.USER_1,
    type: NotificationType.CHEER,
    title: "수현님이 응원했어요! 🎉",
    body: "굿모닝 인증에 수현님이 '최고야!'를 보냈어요",
    data: {
      verification_id: "11111111-1111-4111-a111-111111111111",
      from_user_id: MOCK_USER_IDS.USER_2,
    },
    is_read: false,
    created_at: hoursAgo(2),
  },
  {
    id: NOTIFICATION_IDS.N002,
    user_id: MOCK_USER_IDS.USER_1,
    type: NotificationType.REMINDER,
    title: "오늘의 미션을 완료해보세요!",
    body: "'하루 감사 일기' 미션이 아직 완료되지 않았어요",
    data: {
      mission_id: "d0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a",
    },
    is_read: false,
    created_at: hoursAgo(5),
  },
  {
    id: NOTIFICATION_IDS.N003,
    user_id: MOCK_USER_IDS.USER_1,
    type: NotificationType.CHEER,
    title: "지훈님이 응원했어요! 🎉",
    body: "아침 운동 인증에 지훈님이 '최고야!'를 보냈어요",
    data: {
      verification_id: "33333333-3333-4333-a333-333333333333",
      from_user_id: MOCK_USER_IDS.USER_3,
    },
    is_read: true,
    created_at: hoursAgo(8),
  },
  {
    id: NOTIFICATION_IDS.N004,
    user_id: MOCK_USER_IDS.USER_1,
    type: NotificationType.CHEER,
    title: "서연님이 응원했어요! 🎉",
    body: "아침 운동 인증에 서연님이 '최고야!'를 보냈어요",
    data: {
      verification_id: "33333333-3333-4333-a333-333333333333",
      from_user_id: MOCK_USER_IDS.USER_4,
    },
    is_read: true,
    created_at: hoursAgo(10),
  },

  // ============================================
  // 수현(USER_2)의 알림
  // ============================================
  {
    id: NOTIFICATION_IDS.N005,
    user_id: MOCK_USER_IDS.USER_2,
    type: NotificationType.CHEER,
    title: "민지님이 응원했어요! 🎉",
    body: "굿모닝 인증에 민지님이 '최고야!'를 보냈어요",
    data: {
      verification_id: "22222222-2222-4222-a222-222222222222",
      from_user_id: MOCK_USER_IDS.USER_1,
    },
    is_read: false,
    created_at: hoursAgo(1),
  },
  {
    id: NOTIFICATION_IDS.N006,
    user_id: MOCK_USER_IDS.USER_2,
    type: NotificationType.REMINDER,
    title: "굿모닝! 오늘도 화이팅!",
    body: "'굿모닝 인증' 미션을 완료하고 하루를 시작해보세요",
    data: {
      mission_id: "c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f",
    },
    is_read: true,
    created_at: hoursAgo(16),
  },

  // ============================================
  // 지훈(USER_3)의 알림
  // ============================================
  {
    id: NOTIFICATION_IDS.N007,
    user_id: MOCK_USER_IDS.USER_3,
    type: NotificationType.CHEER,
    title: "서연님이 응원했어요! 🎉",
    body: "헬스장 인증에 서연님이 '최고야!'를 보냈어요",
    data: {
      verification_id: "aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa",
      from_user_id: MOCK_USER_IDS.USER_4,
    },
    is_read: false,
    created_at: hoursAgo(70),
  },
  {
    id: NOTIFICATION_IDS.N008,
    user_id: MOCK_USER_IDS.USER_3,
    type: NotificationType.CHEER,
    title: "현우님이 응원했어요! 🎉",
    body: "헬스장 인증에 현우님이 '최고야!'를 보냈어요",
    data: {
      verification_id: "aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa",
      from_user_id: MOCK_USER_IDS.USER_5,
    },
    is_read: true,
    created_at: hoursAgo(68),
  },

  // ============================================
  // 서연(USER_4)의 알림
  // ============================================
  {
    id: NOTIFICATION_IDS.N009,
    user_id: MOCK_USER_IDS.USER_4,
    type: NotificationType.REMINDER,
    title: "비타민 챙기셨나요?",
    body: "'비타민 챙기기' 미션을 잊지 마세요!",
    data: {
      mission_id: "c5d6e7f8-a9b0-4c1d-2e3f-4a5b6c7d8e9f",
    },
    is_read: false,
    created_at: hoursAgo(12),
  },

  // ============================================
  // 현우(USER_5)의 알림
  // ============================================
  {
    id: NOTIFICATION_IDS.N010,
    user_id: MOCK_USER_IDS.USER_5,
    type: NotificationType.CHEER,
    title: "지훈님이 응원했어요! 🎉",
    body: "운동 루틴 체크에 지훈님이 '최고야!'를 보냈어요",
    data: {
      verification_id: "bbbbbbbb-bbbb-4bbb-abbb-bbbbbbbbbbbb",
      from_user_id: MOCK_USER_IDS.USER_3,
    },
    is_read: false,
    created_at: hoursAgo(65),
  },
];

// ============================================
// 헬퍼 함수
// ============================================

/**
 * 사용자의 알림 목록 조회
 * @param userId - 사용자 ID
 * @returns 알림 목록 (최신순)
 */
export function getMockNotificationsForUser(userId: string): Notification[] {
  return MOCK_NOTIFICATIONS.filter((n) => n.user_id === userId).sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

/**
 * 사용자의 읽지 않은 알림 개수 조회
 * @param userId - 사용자 ID
 * @returns 읽지 않은 알림 개수
 */
export function getMockUnreadNotificationCount(userId: string): number {
  return MOCK_NOTIFICATIONS.filter((n) => n.user_id === userId && !n.is_read)
    .length;
}

/**
 * 사용자의 읽지 않은 알림 목록 조회
 * @param userId - 사용자 ID
 * @returns 읽지 않은 알림 목록
 */
export function getMockUnreadNotifications(userId: string): Notification[] {
  return MOCK_NOTIFICATIONS.filter(
    (n) => n.user_id === userId && !n.is_read
  ).sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

/**
 * 알림 타입별 조회
 * @param userId - 사용자 ID
 * @param type - 알림 타입
 * @returns 해당 타입의 알림 목록
 */
export function getMockNotificationsByType(
  userId: string,
  type: (typeof NotificationType)[keyof typeof NotificationType]
): Notification[] {
  return MOCK_NOTIFICATIONS.filter(
    (n) => n.user_id === userId && n.type === type
  ).sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}
