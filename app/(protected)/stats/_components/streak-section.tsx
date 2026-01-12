"use client";

import { Award, Flame, TrendingUp } from "lucide-react";

import { StreakBadge } from "@/components/common/streak-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StreakSectionProps {
  /** 현재 연속 달성 일수 */
  currentStreak: number;
  /** 최장 연속 달성 일수 */
  longestStreak: number;
  /** 총 인증 수 */
  totalVerifications: number;
}

/**
 * StreakSection - 개인 스트릭 섹션
 * 사용자의 연속 달성 기록을 시각적으로 강조하여 표시
 */
export function StreakSection({
  currentStreak,
  longestStreak,
  totalVerifications,
}: StreakSectionProps) {
  // 스트릭이 0인 경우
  const isZeroStreak = currentStreak === 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>나의 기록</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 현재 스트릭 - 중앙 배치 */}
        <div className="flex flex-col items-center justify-center space-y-3 py-4">
          {isZeroStreak ? (
            // 스트릭이 0인 경우 격려 메시지
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="rounded-full bg-muted p-4">
                <Flame className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                오늘부터 시작해보세요!
              </p>
            </div>
          ) : (
            // 스트릭이 있는 경우 배지 표시
            <>
              <p className="text-sm font-medium text-muted-foreground">
                현재 연속 달성
              </p>
              <StreakBadge streak={currentStreak} size="lg" showLabel={false} />
            </>
          )}
        </div>

        {/* 추가 통계 */}
        <div className="grid grid-cols-2 gap-4">
          {/* 최장 기록 */}
          <div
            className={cn(
              "flex flex-col items-center space-y-2 rounded-lg border p-4",
              "transition-colors hover:bg-muted/50"
            )}
          >
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Award className="h-4 w-4" />
              <span className="text-xs font-medium">최장 기록</span>
            </div>
            <p className="text-2xl font-bold">{longestStreak}일</p>
          </div>

          {/* 총 인증 수 */}
          <div
            className={cn(
              "flex flex-col items-center space-y-2 rounded-lg border p-4",
              "transition-colors hover:bg-muted/50"
            )}
          >
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-medium">총 인증</span>
            </div>
            <p className="text-2xl font-bold">{totalVerifications}회</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
