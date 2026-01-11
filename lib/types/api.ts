// API 요청/응답 타입 정의

import type {
  ChecklistItem,
  Group,
  Mission,
  User,
  Verification,
} from "./database";
import type { RelationshipType, RepeatType, VerificationType } from "./enums";

// ============================================
// 공통 API 응답 타입
// ============================================

/**
 * API 에러 타입
 */
export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

/**
 * 공통 API 응답 래퍼
 */
export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}

/**
 * 페이지네이션 응답
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

/**
 * 페이지네이션 요청 파라미터
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

// ============================================
// 사용자(User) DTO
// ============================================

/**
 * 프로필 업데이트 DTO
 */
export interface UpdateProfileDto {
  nickname?: string;
  profile_image_url?: string | null;
}

/**
 * 프로필 생성 DTO (최초 설정)
 */
export interface CreateProfileDto {
  nickname: string;
  profile_image_url?: string | null;
}

// ============================================
// 그룹(Group) DTO
// ============================================

/**
 * 그룹 생성 DTO
 */
export interface CreateGroupDto {
  name: string;
  description?: string | null;
  relationship_type: RelationshipType;
}

/**
 * 그룹 업데이트 DTO
 */
export interface UpdateGroupDto {
  name?: string;
  description?: string | null;
  relationship_type?: RelationshipType;
}

// ============================================
// 미션(Mission) DTO
// ============================================

/**
 * 미션 생성 DTO
 */
export interface CreateMissionDto {
  group_id: string;
  title: string;
  description?: string | null;
  repeat_type: RepeatType;
  repeat_days?: number[] | null; // 특정 요일 (0-6, 0=일요일)
  verification_type: VerificationType;
}

/**
 * 미션 업데이트 DTO
 */
export interface UpdateMissionDto {
  title?: string;
  description?: string | null;
  repeat_type?: RepeatType;
  repeat_days?: number[] | null;
  verification_type?: VerificationType;
  is_active?: boolean;
}

// ============================================
// 인증(Verification) DTO
// ============================================

/**
 * 인증 생성 DTO
 */
export interface CreateVerificationDto {
  mission_id: string;
  image_url?: string | null;
  text_content?: string | null;
  checklist_items?: ChecklistItem[] | null;
}

// ============================================
// 초대(Invite) DTO
// ============================================

/**
 * 초대 링크 생성 DTO
 */
export interface CreateInviteDto {
  group_id: string;
  expires_in_hours?: number; // 기본값: 24시간
}

// ============================================
// 응원(Cheer) DTO
// ============================================

/**
 * 응원 생성 DTO
 */
export interface CreateCheerDto {
  verification_id: string;
}

// ============================================
// 알림(Notification) DTO
// ============================================

/**
 * 알림 읽음 처리 DTO
 */
export interface MarkNotificationReadDto {
  notification_ids: string[];
}

// ============================================
// 조회 응답 타입 (API 응답에서 사용)
// ============================================

/**
 * 사용자 조회 응답
 */
export type UserResponse = ApiResponse<User>;

/**
 * 그룹 조회 응답
 */
export type GroupResponse = ApiResponse<Group>;

/**
 * 그룹 목록 조회 응답
 */
export type GroupListResponse = ApiResponse<Group[]>;

/**
 * 미션 조회 응답
 */
export type MissionResponse = ApiResponse<Mission>;

/**
 * 미션 목록 조회 응답
 */
export type MissionListResponse = ApiResponse<Mission[]>;

/**
 * 인증 조회 응답
 */
export type VerificationResponse = ApiResponse<Verification>;

/**
 * 인증 목록 조회 응답
 */
export type VerificationListResponse = ApiResponse<Verification[]>;
