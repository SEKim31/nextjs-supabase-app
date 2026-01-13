"use client";

import Link from "next/link";

import { CheckCircle2, ChevronRight, Circle, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MOCK_GROUPS } from "@/lib/mocks/groups";
import { MOCK_MISSION_IDS } from "@/lib/mocks/helpers";

// 오늘의 미션 샘플 데이터 (Mock 데이터 ID 사용)
const TODAY_MISSIONS = [
  {
    id: MOCK_MISSION_IDS.MISSION_1,
    title: "굿모닝 인증",
    groupId: MOCK_GROUPS[0].id,
    groupName: MOCK_GROUPS[0].name,
    isCompleted: true,
    completionRate: 100,
  },
  {
    id: MOCK_MISSION_IDS.MISSION_2,
    title: "하루 감사 일기",
    groupId: MOCK_GROUPS[0].id,
    groupName: MOCK_GROUPS[0].name,
    isCompleted: false,
    completionRate: 50,
  },
  {
    id: MOCK_MISSION_IDS.MISSION_3,
    title: "물 8잔 마시기",
    groupId: MOCK_GROUPS[0].id,
    groupName: MOCK_GROUPS[0].name,
    isCompleted: false,
    completionRate: 25,
  },
  {
    id: MOCK_MISSION_IDS.MISSION_5,
    title: "아침 운동 10분",
    groupId: MOCK_GROUPS[1].id,
    groupName: MOCK_GROUPS[1].name,
    isCompleted: true,
    completionRate: 75,
  },
  {
    id: MOCK_MISSION_IDS.MISSION_6,
    title: "독서 30분",
    groupId: MOCK_GROUPS[1].id,
    groupName: MOCK_GROUPS[1].name,
    isCompleted: false,
    completionRate: 33,
  },
];

/**
 * 미션 목록 페이지
 * 오늘 수행해야 할 미션들을 그룹별로 표시합니다.
 */
export default function MissionsPage() {
  // 완료/미완료 미션 수 계산
  const completedCount = TODAY_MISSIONS.filter((m) => m.isCompleted).length;
  const totalCount = TODAY_MISSIONS.length;

  // 그룹별로 미션 분류
  const missionsByGroup = TODAY_MISSIONS.reduce(
    (acc, mission) => {
      if (!acc[mission.groupName]) {
        acc[mission.groupName] = [];
      }
      acc[mission.groupName].push(mission);
      return acc;
    },
    {} as Record<string, typeof TODAY_MISSIONS>
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 border-b bg-background px-4 py-4">
        <h1 className="text-xl font-bold">오늘의 미션</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {completedCount}/{totalCount} 완료 · 오늘도 화이팅!
        </p>
      </header>

      {/* 미션 목록 */}
      <main className="space-y-6 p-4">
        {Object.entries(missionsByGroup).map(
          ([groupName, groupMissions], idx) => (
            <section key={groupName} className="space-y-3">
              {idx > 0 && <Separator />}
              <h2 className="text-sm font-medium text-muted-foreground">
                {groupName}
              </h2>
              <div className="space-y-2">
                {groupMissions.map((mission) => (
                  <Link key={mission.id} href={`/missions/${mission.id}`}>
                    <Card className="transition-colors hover:bg-accent">
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-start gap-3">
                          {mission.isCompleted ? (
                            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                          ) : (
                            <Circle className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                          )}
                          <div className="space-y-1">
                            <h3 className="font-medium leading-none">
                              {mission.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {mission.completionRate}%
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )
        )}
      </main>

      {/* 새 미션 만들기 FAB */}
      <div className="fixed bottom-24 right-4">
        <Button size="lg" className="h-14 w-14 rounded-full shadow-lg" asChild>
          <Link href="/missions/new">
            <Plus className="h-6 w-6" />
            <span className="sr-only">새 미션 만들기</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
