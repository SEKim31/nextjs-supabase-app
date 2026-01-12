"use client";

import { StatChart } from "@/components/common/stat-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WeeklyStatsSectionProps {
  /** 주간 달성률 데이터 (월~일 7일) */
  weeklyData: Array<{ label: string; value: number }>;
}

/**
 * WeeklyStatsSection - 주간 통계 섹션 컴포넌트
 * StatChart를 래핑하여 주간 달성률 표시
 */
export function WeeklyStatsSection({ weeklyData }: WeeklyStatsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">주간 달성률</CardTitle>
      </CardHeader>
      <CardContent>
        <StatChart data={weeklyData} height={180} showLabels={true} />
      </CardContent>
    </Card>
  );
}
