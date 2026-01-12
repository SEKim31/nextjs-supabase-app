import { MOCK_WEEKLY_STATS } from "@/lib/mocks";

import { GroupStatsSection } from "../_components";

/**
 * GroupStatsSection 컴포넌트 테스트 페이지
 */
export default function TestGroupStatsPage() {
  // MOCK_WEEKLY_STATS를 배열로 변환
  const groupStats = Object.values(MOCK_WEEKLY_STATS).map((stat) => ({
    groupId: stat.groupId,
    groupName: stat.groupName,
    totalVerifications: stat.totalVerifications,
    totalCheers: stat.totalCheers,
  }));

  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-6">
      <div>
        <h1 className="mb-2 text-2xl font-bold">
          GroupStatsSection 컴포넌트 테스트
        </h1>
        <p className="text-muted-foreground">
          그룹별 누적 통계를 확인할 수 있습니다.
        </p>
      </div>

      {/* 그룹별 통계 섹션 */}
      <GroupStatsSection groupStats={groupStats} />

      {/* 빈 데이터 테스트 */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-bold">빈 데이터 테스트</h2>
        <GroupStatsSection groupStats={[]} />
      </div>
    </div>
  );
}
