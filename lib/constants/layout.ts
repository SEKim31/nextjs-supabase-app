/**
 * 레이아웃 관련 상수 모음
 * - 하드코딩된 레이아웃 값들을 한 곳에서 관리
 */

/**
 * 모바일 프레임 너비 (px)
 * - AppFrame 컴포넌트에서 사용
 */
export const MOBILE_FRAME_WIDTH = 430;

/**
 * 하단 탭 바 높이 (px)
 * - Tailwind: h-16 (4rem = 64px)
 * - BottomTabBar 컴포넌트에서 사용
 */
export const TAB_BAR_HEIGHT = 64;

/**
 * 페이지 헤더 높이 (px)
 * - Tailwind: h-14 (3.5rem = 56px)
 * - PageHeader 컴포넌트에서 사용
 */
export const HEADER_HEIGHT = 56;

/**
 * 그룹당 최대 멤버 수
 * - 그룹 생성 및 초대 제한
 */
export const MAX_GROUP_MEMBERS = 6;

/**
 * 그룹당 최대 미션 수
 * - 미션 생성 제한
 */
export const MAX_MISSIONS_PER_GROUP = 5;

/**
 * 초대 링크 유효 기간 (일)
 * - 초대 링크 생성 시 만료일 설정
 */
export const INVITE_LINK_EXPIRY_DAYS = 7;

/**
 * 미션 인증 가능 시간 (시간)
 * - 매일 자정부터 23:59까지
 */
export const VERIFICATION_WINDOW_HOURS = 24;

/**
 * 연속 달성 카운트 초기화 기준 (일)
 * - 미션을 며칠 이상 놓치면 연속 달성 초기화
 */
export const STREAK_RESET_DAYS = 2;

/**
 * 프로필 이미지 최대 크기 (MB)
 */
export const MAX_PROFILE_IMAGE_SIZE_MB = 5;

/**
 * 인증 사진 최대 크기 (MB)
 */
export const MAX_VERIFICATION_IMAGE_SIZE_MB = 10;
