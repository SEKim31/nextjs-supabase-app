// 연속 달성(스트릭) 계산 유틸리티

import { differenceInDays, isToday, isYesterday, startOfDay } from "date-fns";

/**
 * 인증 날짜 정보 인터페이스
 */
interface VerificationDate {
  verified_at: string;
}

/**
 * 스트릭 기간 정보 인터페이스
 */
export interface StreakPeriod {
  startDate: Date;
  endDate: Date;
  days: number;
}

/**
 * 인증 목록에서 고유 날짜들을 추출하고 정렬
 * 하루에 여러 번 인증해도 1일로 계산
 */
function getUniqueDates(verifications: VerificationDate[]): Date[] {
  const dateSet = new Set<string>();

  verifications.forEach((v) => {
    const date = startOfDay(new Date(v.verified_at));
    dateSet.add(date.toISOString());
  });

  return Array.from(dateSet)
    .map((d) => new Date(d))
    .sort((a, b) => b.getTime() - a.getTime()); // 최신순 정렬
}

/**
 * 현재 연속 달성 일수 계산
 * 오늘 또는 어제부터 시작되는 연속 달성 일수를 반환
 *
 * @param verifications 인증 목록
 * @returns 현재 연속 달성 일수 (스트릭이 끊긴 경우 0)
 */
export function calculateCurrentStreak(
  verifications: VerificationDate[]
): number {
  if (verifications.length === 0) return 0;

  const uniqueDates = getUniqueDates(verifications);
  if (uniqueDates.length === 0) return 0;

  const latestDate = uniqueDates[0];

  // 오늘 또는 어제부터 시작하는지 확인 (스트릭이 유효한지)
  if (!isToday(latestDate) && !isYesterday(latestDate)) {
    return 0;
  }

  // 연속 일수 계산
  let streak = 1;

  for (let i = 1; i < uniqueDates.length; i++) {
    const diff = differenceInDays(uniqueDates[i - 1], uniqueDates[i]);

    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * 최장 연속 달성 일수 계산
 *
 * @param verifications 인증 목록
 * @returns 최장 연속 달성 일수
 */
export function calculateLongestStreak(
  verifications: VerificationDate[]
): number {
  if (verifications.length === 0) return 0;

  const uniqueDates = getUniqueDates(verifications);
  if (uniqueDates.length === 0) return 0;

  let longestStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < uniqueDates.length; i++) {
    const diff = differenceInDays(uniqueDates[i - 1], uniqueDates[i]);

    if (diff === 1) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  return longestStreak;
}

/**
 * 현재 스트릭 기간의 시작/끝 날짜 반환
 *
 * @param verifications 인증 목록
 * @returns 스트릭 기간 정보 (스트릭이 없으면 null)
 */
export function getStreakDates(
  verifications: VerificationDate[]
): StreakPeriod | null {
  if (verifications.length === 0) return null;

  const uniqueDates = getUniqueDates(verifications);
  if (uniqueDates.length === 0) return null;

  const latestDate = uniqueDates[0];

  // 오늘 또는 어제부터 시작하는지 확인
  if (!isToday(latestDate) && !isYesterday(latestDate)) {
    return null;
  }

  // 연속 기간 찾기
  let streakEndIndex = 0;

  for (let i = 1; i < uniqueDates.length; i++) {
    const diff = differenceInDays(uniqueDates[i - 1], uniqueDates[i]);

    if (diff === 1) {
      streakEndIndex = i;
    } else {
      break;
    }
  }

  return {
    startDate: uniqueDates[streakEndIndex],
    endDate: uniqueDates[0],
    days: streakEndIndex + 1,
  };
}

/**
 * 주어진 날짜가 스트릭에 포함되는지 확인
 *
 * @param date 확인할 날짜
 * @param streakPeriod 스트릭 기간
 * @returns 포함 여부
 */
export function isDateInStreak(
  date: Date,
  streakPeriod: StreakPeriod | null
): boolean {
  if (!streakPeriod) return false;

  const targetDate = startOfDay(date);
  const startDate = startOfDay(streakPeriod.startDate);
  const endDate = startOfDay(streakPeriod.endDate);

  return targetDate >= startDate && targetDate <= endDate;
}
