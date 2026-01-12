"use client";

import { CheckCircle2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TodaySummaryCardProps {
  /** 완료된 미션 수 */
  completedCount: number;
  /** 전체 미션 수 */
  totalCount: number;
  /** 날짜 문자열 (예: "2024년 1월 12일") */
  dateString?: string;
}

/**
 * 오늘의 미션 진행 상황을 요약하여 표시하는 카드 컴포넌트
 * 완료/전체 미션 수와 진행률을 시각적으로 보여줍니다.
 */
export function TodaySummaryCard({
  completedCount,
  totalCount,
  dateString,
}: TodaySummaryCardProps) {
  // 진행률 계산 (0으로 나누기 방지)
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const isAllCompleted = totalCount > 0 && completedCount === totalCount;

  // 날짜 표시 (제공되지 않으면 오늘 날짜 사용)
  const displayDate =
    dateString ||
    new Date().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardDescription className="text-xs">{displayDate}</CardDescription>
            <CardTitle className="mt-1 text-xl">오늘의 미션</CardTitle>
          </div>
          {isAllCompleted && (
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold">{completedCount}</span>
            <span className="text-sm text-muted-foreground">
              / {totalCount}
            </span>
          </div>
          <span className="text-sm font-medium">
            {Math.round(progress)}% 완료
          </span>
        </div>
        <Progress value={progress} className="h-2" />
        {isAllCompleted ? (
          <p className="text-sm font-medium text-green-600">
            🎉 오늘의 모든 미션을 완료했어요!
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            {totalCount - completedCount}개의 미션이 남았어요
          </p>
        )}
      </CardContent>
    </Card>
  );
}
