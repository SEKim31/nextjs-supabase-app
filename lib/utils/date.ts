import {
  format,
  formatDistanceToNow,
  isToday as isTodayFns,
  isThisWeek as isThisWeekFns,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { ko } from "date-fns/locale";

/**
 * 날짜를 YYYY-MM-DD 형식으로 포맷
 * @param date - Date 객체 또는 날짜 문자열
 * @returns 포맷된 날짜 문자열
 */
export function formatDate(date: Date | string): string {
  return format(new Date(date), "yyyy-MM-dd");
}

/**
 * 날짜를 YYYY-MM-DD HH:mm 형식으로 포맷
 * @param date - Date 객체 또는 날짜 문자열
 * @returns 포맷된 날짜/시간 문자열
 */
export function formatDateTime(date: Date | string): string {
  return format(new Date(date), "yyyy-MM-dd HH:mm");
}

/**
 * 상대적 시간 표시 (방금 전, N분 전, N시간 전, N일 전)
 * @param date - Date 객체 또는 날짜 문자열
 * @returns 상대적 시간 문자열
 */
export function formatRelativeTime(date: Date | string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko });
}

/**
 * 오늘인지 확인
 * @param date - Date 객체 또는 날짜 문자열
 * @returns 오늘이면 true
 */
export function isToday(date: Date | string): boolean {
  return isTodayFns(new Date(date));
}

/**
 * 이번 주인지 확인
 * @param date - Date 객체 또는 날짜 문자열
 * @returns 이번 주이면 true
 */
export function isThisWeek(date: Date | string): boolean {
  return isThisWeekFns(new Date(date), { locale: ko });
}

/**
 * 이번 주의 날짜 배열 반환
 * @param baseDate - 기준 날짜 (기본값: 오늘)
 * @returns 이번 주 날짜 배열 (일요일부터 토요일)
 */
export function getWeekDates(baseDate: Date = new Date()): Date[] {
  const start = startOfWeek(baseDate, { locale: ko });
  const end = endOfWeek(baseDate, { locale: ko });
  return eachDayOfInterval({ start, end });
}

/**
 * 해당 월의 날짜 배열 반환
 * @param year - 연도
 * @param month - 월 (1-12)
 * @returns 해당 월의 날짜 배열
 */
export function getMonthDates(year: number, month: number): Date[] {
  const date = new Date(year, month - 1, 1);
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  return eachDayOfInterval({ start, end });
}

/**
 * 날짜를 한국어 형식으로 포맷 (YYYY년 MM월 DD일)
 * @param date - Date 객체 또는 날짜 문자열
 * @returns 한국어 형식 날짜 문자열
 */
export function formatKoreanDate(date: Date | string): string {
  return format(new Date(date), "yyyy년 M월 d일", { locale: ko });
}

/**
 * 요일을 한국어로 반환
 * @param date - Date 객체 또는 날짜 문자열
 * @returns 한국어 요일 (예: 월, 화, 수...)
 */
export function getDayOfWeekKorean(date: Date | string): string {
  return format(new Date(date), "E", { locale: ko });
}
