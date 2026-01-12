"use client";

import {
  getMockTodayStatus,
  MOCK_USER_IDS,
  MOCK_USER_STREAKS,
  MOCK_VERIFICATIONS,
  MOCK_WEEKLY_STATS,
} from "@/lib/mocks";

import {
  GroupStatsSection,
  MonthlyCalendarSection,
  StatsHeader,
  StreakSection,
  TodayOverviewCard,
  WeeklyChartSection,
} from "./_components";

/**
 * 통계 페이지
 * 사용자의 미션 달성 현황과 통계를 시각화하여 보여줍니다.
 */
export default function StatsPage() {
  // Mock 데이터 준비
  const todayStatus = getMockTodayStatus(MOCK_USER_IDS.USER_1);
  const weeklyStats = Object.values(MOCK_WEEKLY_STATS);
  const streakData = MOCK_USER_STREAKS[MOCK_USER_IDS.USER_1];
  const verificationDates = MOCK_VERIFICATIONS.map(
    (v) => new Date(v.verified_at)
  );

  return (
    <>
      {/* 헤더 */}
      <StatsHeader />

      {/* 메인 콘텐츠 */}
      <div className="space-y-6 pb-6">
        {/* 오늘의 현황 카드 */}
        <div className="px-4">
          <TodayOverviewCard
            completedMissions={todayStatus.completedMissions}
            totalMissions={todayStatus.totalMissions}
            completionRate={todayStatus.completionRate}
          />
        </div>

        {/* 주간 달성률 차트 */}
        <div className="px-4">
          <WeeklyChartSection groupStats={weeklyStats} />
        </div>

        {/* 월간 달성 캘린더 */}
        <div className="px-4">
          <MonthlyCalendarSection verificationDates={verificationDates} />
        </div>

        {/* 스트릭 섹션 */}
        <div className="px-4">
          <StreakSection
            currentStreak={streakData.currentStreak}
            longestStreak={streakData.longestStreak}
            totalVerifications={streakData.totalVerifications}
          />
        </div>

        {/* 그룹별 통계 섹션 */}
        <div className="px-4">
          <GroupStatsSection groupStats={weeklyStats} />
        </div>
      </div>
    </>
  );
}
