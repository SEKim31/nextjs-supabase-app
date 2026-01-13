import Link from "next/link";

import { CheckCircle2, Circle, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Mission {
  /** 미션 ID */
  id: string;
  /** 미션 제목 */
  title: string;
  /** 그룹 이름 */
  groupName: string;
  /** 인증 완료 여부 */
  isCompleted: boolean;
  /** 그룹 내 전체 인증률 (0-100) */
  completionRate: number;
}

interface MissionSectionProps {
  /** 미션 목록 */
  missions: Mission[];
  /** 로딩 상태 */
  isLoading?: boolean;
}

/**
 * 미션 카드 아이템 컴포넌트
 */
function MissionCard({ mission }: { mission: Mission }) {
  return (
    <Link href={`/missions/${mission.id}`}>
      <Card className="hover:bg-accent transition-colors">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-start gap-3">
            {mission.isCompleted ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
            ) : (
              <Circle className="text-muted-foreground mt-0.5 h-5 w-5 shrink-0" />
            )}
            <div className="space-y-1">
              <h4 className="leading-none font-medium">{mission.title}</h4>
              <div className="flex items-center gap-2">
                <p className="text-muted-foreground text-sm">
                  {mission.groupName}
                </p>
                <Badge variant="secondary" className="text-xs">
                  {mission.completionRate}%
                </Badge>
              </div>
            </div>
          </div>
          <ChevronRight className="text-muted-foreground h-5 w-5" />
        </CardContent>
      </Card>
    </Link>
  );
}

/**
 * 로딩 스켈레톤 컴포넌트
 */
function MissionSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="bg-muted h-5 w-5 animate-pulse rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="bg-muted h-4 w-3/4 animate-pulse rounded" />
            <div className="bg-muted h-3 w-1/2 animate-pulse rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * 미션 목록 섹션 컴포넌트
 * 오늘의 미션 목록을 그룹별로 구분하여 표시합니다.
 */
export function MissionSection({ missions, isLoading }: MissionSectionProps) {
  // 로딩 중
  if (isLoading) {
    return (
      <div className="space-y-4 px-4">
        <div>
          <h2 className="text-lg font-semibold">오늘의 미션</h2>
          <p className="text-muted-foreground text-sm">
            완료하지 않은 미션을 확인하세요
          </p>
        </div>
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <MissionSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // 미션이 없는 경우
  if (missions.length === 0) {
    return (
      <div className="space-y-4 px-4">
        <div>
          <h2 className="text-lg font-semibold">오늘의 미션</h2>
          <p className="text-muted-foreground text-sm">
            완료하지 않은 미션을 확인하세요
          </p>
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-base">
              오늘 진행할 미션이 없어요
            </CardTitle>
            <CardDescription>그룹에서 미션을 생성해보세요</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // 그룹별로 미션 분류
  const missionsByGroup = missions.reduce(
    (acc, mission) => {
      if (!acc[mission.groupName]) {
        acc[mission.groupName] = [];
      }
      acc[mission.groupName].push(mission);
      return acc;
    },
    {} as Record<string, Mission[]>
  );

  return (
    <div className="space-y-6 px-4">
      <div>
        <h2 className="text-lg font-semibold">오늘의 미션</h2>
        <p className="text-muted-foreground text-sm">
          완료하지 않은 미션을 확인하세요
        </p>
      </div>

      {Object.entries(missionsByGroup).map(
        ([groupName, groupMissions], idx) => (
          <div key={groupName} className="space-y-3">
            {idx > 0 && <Separator />}
            <h3 className="text-muted-foreground text-sm font-medium">
              {groupName}
            </h3>
            <div className="space-y-2">
              {groupMissions.map((mission) => (
                <MissionCard key={mission.id} mission={mission} />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}
