import { MOCK_WEEKLY_STATS } from "@/lib/mocks";

import { WeeklyChartSection } from "../_components";

// WeeklyChartSection 컴포넌트 테스트 페이지
export default function TestWeeklyChartPage() {
  // 주간 통계 데이터를 배열로 변환
  const groupStats = Object.values(MOCK_WEEKLY_STATS);

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">주간 달성률 차트 테스트</h1>
        <p className="mt-2 text-muted-foreground">
          WeeklyChartSection 컴포넌트 동작 확인
        </p>
      </div>

      <WeeklyChartSection groupStats={groupStats} />

      {/* 데이터 확인용 */}
      <div className="rounded-lg border p-4">
        <h2 className="mb-2 font-semibold">Mock 데이터:</h2>
        <pre className="overflow-auto text-xs">
          {JSON.stringify(groupStats, null, 2)}
        </pre>
      </div>
    </div>
  );
}
