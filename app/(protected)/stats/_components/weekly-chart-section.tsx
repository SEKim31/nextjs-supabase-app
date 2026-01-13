"use client";

import { StatChart } from "@/components/common/stat-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface WeeklyChartSectionProps {
  groupStats: Array<{
    groupId: string;
    groupName: string;
    weeklyRates: number[];
    totalVerifications: number;
    totalCheers: number;
  }>;
}

/**
 * WeeklyChartSection - 그룹별 주간 달성률 차트 섹션
 * 탭으로 그룹을 전환하며 각 그룹의 주간 달성률을 차트로 표시
 */
export function WeeklyChartSection({ groupStats }: WeeklyChartSectionProps) {
  // 요일 라벨 (일~토)
  const weekLabels = ["일", "월", "화", "수", "목", "금", "토"];

  // weeklyRates(0-1)를 StatChart용 data(0-100)로 변환
  const convertToChartData = (weeklyRates: number[]) => {
    return weeklyRates.map((rate, index) => ({
      label: weekLabels[index],
      value: rate * 100, // 0-1 범위를 0-100으로 변환
    }));
  };

  // 그룹이 없는 경우 처리
  if (groupStats.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>주간 달성률</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center text-sm">
            참여 중인 그룹이 없습니다.
          </p>
        </CardContent>
      </Card>
    );
  }

  // 첫 번째 그룹을 기본 선택 탭으로 설정
  const defaultGroup = groupStats[0].groupId;

  return (
    <Card>
      <CardHeader>
        <CardTitle>주간 달성률</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={defaultGroup} className="w-full">
          {/* 그룹 탭 목록 */}
          <TabsList className="mb-4 w-full">
            {groupStats.map((group) => (
              <TabsTrigger
                key={group.groupId}
                value={group.groupId}
                className="flex-1"
              >
                {group.groupName}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* 각 그룹별 차트 */}
          {groupStats.map((group) => (
            <TabsContent key={group.groupId} value={group.groupId}>
              <StatChart
                data={convertToChartData(group.weeklyRates)}
                height={200}
                showLabels={true}
              />

              {/* 추가 통계 정보 */}
              <div className="mt-6 flex items-center justify-around border-t pt-4 text-center">
                <div>
                  <p className="text-muted-foreground text-sm">총 인증</p>
                  <p className="text-2xl font-bold">
                    {group.totalVerifications}
                  </p>
                </div>
                <div className="bg-border h-10 w-px" />
                <div>
                  <p className="text-muted-foreground text-sm">총 응원</p>
                  <p className="text-2xl font-bold">{group.totalCheers}</p>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
