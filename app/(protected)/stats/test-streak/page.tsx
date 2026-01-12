import { MOCK_CURRENT_USER_ID, MOCK_USER_STREAKS } from "@/lib/mocks";

import { StreakSection } from "../_components";

/**
 * StreakSection 테스트 페이지
 */
export default function TestStreakPage() {
  // Mock 데이터
  const streakData = MOCK_USER_STREAKS[MOCK_CURRENT_USER_ID];

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">StreakSection 테스트</h1>
        <p className="text-muted-foreground">
          개인 스트릭 섹션 컴포넌트 테스트 페이지
        </p>
      </div>

      <div className="space-y-6">
        {/* 정상 데이터 테스트 */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">1. 정상 데이터</h2>
          <StreakSection
            currentStreak={streakData.currentStreak}
            longestStreak={streakData.longestStreak}
            totalVerifications={streakData.totalVerifications}
          />
        </div>

        {/* 스트릭 0일 테스트 */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">2. 스트릭 0일 (격려 메시지)</h2>
          <StreakSection
            currentStreak={0}
            longestStreak={10}
            totalVerifications={25}
          />
        </div>

        {/* 높은 수치 테스트 */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">3. 높은 수치 테스트</h2>
          <StreakSection
            currentStreak={100}
            longestStreak={150}
            totalVerifications={500}
          />
        </div>

        {/* 시작 단계 테스트 */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">4. 시작 단계 (낮은 수치)</h2>
          <StreakSection
            currentStreak={1}
            longestStreak={1}
            totalVerifications={1}
          />
        </div>
      </div>
    </div>
  );
}
