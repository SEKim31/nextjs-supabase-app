// 하루모아 앱에서 사용하는 Enum 타입 및 상수 정의

/**
 * 그룹 관계 유형
 * Supabase에서 사용할 값은 소문자 스네이크 케이스
 */
export const RelationshipType = {
  COUPLE: "couple",
  FAMILY: "family",
  FRIENDS: "friends",
  OTHER: "other",
} as const;

export type RelationshipType =
  (typeof RelationshipType)[keyof typeof RelationshipType];

// 관계 유형별 라벨 매핑
export const RELATIONSHIP_LABELS: Record<RelationshipType, string> = {
  couple: "커플",
  family: "가족",
  friends: "친구",
  other: "기타",
};

// 관계 유형별 아이콘 매핑 (Lucide 아이콘 이름)
export const RELATIONSHIP_ICONS: Record<RelationshipType, string> = {
  couple: "Heart",
  family: "Home",
  friends: "Users",
  other: "MoreHorizontal",
};

/**
 * 미션 반복 유형
 */
export const RepeatType = {
  DAILY: "daily",
  SPECIFIC_DAYS: "specific_days",
} as const;

export type RepeatType = (typeof RepeatType)[keyof typeof RepeatType];

// 반복 유형별 라벨 매핑
export const REPEAT_LABELS: Record<RepeatType, string> = {
  daily: "매일",
  specific_days: "특정 요일",
};

/**
 * 인증 타입
 */
export const VerificationType = {
  PHOTO: "photo",
  TEXT: "text",
  CHECKLIST: "checklist",
} as const;

export type VerificationType =
  (typeof VerificationType)[keyof typeof VerificationType];

// 인증 타입별 라벨 매핑
export const VERIFICATION_LABELS: Record<VerificationType, string> = {
  photo: "사진 인증",
  text: "텍스트 인증",
  checklist: "체크리스트 인증",
};

// 인증 타입별 아이콘 매핑 (Lucide 아이콘 이름)
export const VERIFICATION_ICONS: Record<VerificationType, string> = {
  photo: "Camera",
  text: "FileText",
  checklist: "CheckSquare",
};

/**
 * 알림 유형
 */
export const NotificationType = {
  CHEER: "cheer",
  REMINDER: "reminder",
} as const;

export type NotificationType =
  (typeof NotificationType)[keyof typeof NotificationType];

// 알림 유형별 라벨 매핑
export const NOTIFICATION_LABELS: Record<NotificationType, string> = {
  cheer: "응원",
  reminder: "리마인더",
};

// 알림 유형별 아이콘 매핑 (Lucide 아이콘 이름)
export const NOTIFICATION_ICONS: Record<NotificationType, string> = {
  cheer: "Sparkles",
  reminder: "Bell",
};

/**
 * 요일 상수
 */
export const DayOfWeek = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 0,
} as const;

export type DayOfWeek = (typeof DayOfWeek)[keyof typeof DayOfWeek];

// 요일별 라벨 매핑
export const DAY_LABELS: Record<DayOfWeek, string> = {
  0: "일",
  1: "월",
  2: "화",
  3: "수",
  4: "목",
  5: "금",
  6: "토",
};
