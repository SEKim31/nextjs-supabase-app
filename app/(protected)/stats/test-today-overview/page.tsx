import { TodayOverviewCard } from "../_components";

/**
 * TodayOverviewCard 컴포넌트 테스트 페이지
 * 다양한 완료율 케이스를 시각적으로 확인
 */
export default function TestTodayOverviewPage() {
  const testCases = [
    {
      title: "0% 완료",
      completedMissions: 0,
      totalMissions: 5,
      completionRate: 0,
    },
    {
      title: "40% 완료",
      completedMissions: 2,
      totalMissions: 5,
      completionRate: 0.4,
    },
    {
      title: "75% 완료",
      completedMissions: 3,
      totalMissions: 4,
      completionRate: 0.75,
    },
    {
      title: "100% 완료",
      completedMissions: 5,
      totalMissions: 5,
      completionRate: 1.0,
    },
    {
      title: "미션 없음",
      completedMissions: 0,
      totalMissions: 0,
      completionRate: 0,
    },
  ];

  return (
    <div className="container mx-auto space-y-6 py-8">
      <h1 className="text-3xl font-bold">TodayOverviewCard 테스트</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testCases.map((testCase, index) => (
          <div key={index} className="space-y-2">
            <h2 className="text-muted-foreground text-lg font-semibold">
              {testCase.title}
            </h2>
            <TodayOverviewCard
              completedMissions={testCase.completedMissions}
              totalMissions={testCase.totalMissions}
              completionRate={testCase.completionRate}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
