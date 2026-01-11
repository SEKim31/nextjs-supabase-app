// 하루모아 데이터베이스 인터페이스 정의
// Supabase와 호환되도록 필드명은 snake_case 사용

import type {
  NotificationType,
  RelationshipType,
  RepeatType,
  VerificationType,
} from "./enums";

/**
 * 사용자 정보
 */
export interface User {
  id: string;
  email: string;
  nickname: string | null;
  profile_image_url: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * 그룹 정보
 */
export interface Group {
  id: string;
  name: string;
  description: string | null;
  relationship_type: RelationshipType;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

/**
 * 그룹 멤버
 */
export interface GroupMember {
  id: string;
  group_id: string;
  user_id: string;
  joined_at: string;
}

/**
 * 그룹 초대 링크
 */
export interface GroupInvite {
  id: string;
  group_id: string;
  token: string;
  expires_at: string;
  created_by: string;
  created_at: string;
}

/**
 * 미션 정보
 */
export interface Mission {
  id: string;
  group_id: string;
  title: string;
  description: string | null;
  repeat_type: RepeatType;
  repeat_days: number[] | null; // 특정 요일 (0-6, 0=일요일)
  verification_type: VerificationType;
  created_by: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * 인증 기록
 */
export interface Verification {
  id: string;
  mission_id: string;
  user_id: string;
  verified_at: string;
  image_url: string | null;
  text_content: string | null;
  checklist_items: ChecklistItem[] | null;
  created_at: string;
}

/**
 * 체크리스트 아이템 (인증용)
 */
export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

/**
 * 응원 기록
 */
export interface Cheer {
  id: string;
  verification_id: string;
  user_id: string;
  created_at: string;
}

/**
 * 알림
 */
export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  body: string | null;
  data: Record<string, unknown> | null;
  is_read: boolean;
  created_at: string;
}

// ============================================
// 관계 타입 (조인 결과용)
// ============================================

/**
 * 그룹 + 멤버 목록
 */
export interface GroupWithMembers extends Group {
  members: (GroupMember & { user: User })[];
}

/**
 * 그룹 + 미션 목록
 */
export interface GroupWithMissions extends Group {
  missions: Mission[];
}

/**
 * 미션 + 인증 목록
 */
export interface MissionWithVerifications extends Mission {
  verifications: Verification[];
}

/**
 * 인증 + 응원 목록
 */
export interface VerificationWithCheers extends Verification {
  cheers: Cheer[];
  cheer_count: number;
}

/**
 * 인증 + 사용자 정보
 */
export interface VerificationWithUser extends Verification {
  user: User;
}

/**
 * 대시보드용 미션 상태
 */
export interface MissionStatus extends Mission {
  is_completed_today: boolean;
  today_verification: Verification | null;
}

/**
 * 그룹 카드 표시용
 */
export interface GroupCardData extends Group {
  member_count: number;
  today_completion_rate: number;
}
