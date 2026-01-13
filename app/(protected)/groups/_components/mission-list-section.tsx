"use client";

import { MissionCard } from "@/components/common/mission-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Mission } from "@/lib/types/database";

interface MissionListSectionProps {
  /** 미션 목록 */
  missions: Mission[];
}

/**
 * MissionListSection - 미션 목록 섹션 컴포넌트
 * 그룹의 미션들을 MissionCard로 표시
 */
export function MissionListSection({ missions }: MissionListSectionProps) {
  if (missions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">미션 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground text-sm">
              아직 생성된 미션이 없습니다.
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              새로운 미션을 생성해보세요!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold">
        미션 목록 ({missions.length}개)
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {missions.map((mission) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            isCompletedToday={false} // TODO: 실제 인증 데이터와 연동 필요
            // eslint-disable-next-line no-console
            onVerify={() => console.log(`인증하기: ${mission.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
