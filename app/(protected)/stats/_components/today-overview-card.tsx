import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TodayOverviewCardProps {
  completedMissions: number;
  totalMissions: number;
  completionRate: number;
}

/**
 * 오늘의 현황 요약 카드 컴포넌트
 * 오늘의 미션 완료 현황을 Progress 바와 함께 표시합니다.
 */
export function TodayOverviewCard({
  completedMissions,
  totalMissions,
  completionRate,
}: TodayOverviewCardProps) {
  // 퍼센트 계산 (0-100 범위)
  const percentageValue = Math.round(completionRate * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>오늘의 현황</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 완료 미션 수 표시 */}
        <div className="text-muted-foreground text-sm">
          완료된 미션{" "}
          <span className="text-foreground font-semibold">
            {completedMissions}개
          </span>{" "}
          / 전체 {totalMissions}개
        </div>

        {/* Progress 바 */}
        <div className="space-y-2">
          <Progress value={percentageValue} className="h-2" />
          <div className="text-right text-sm font-medium">
            {percentageValue}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
