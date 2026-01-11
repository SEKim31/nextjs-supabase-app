"use client";

import { Flame } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StreakBadgeProps {
  /** 연속 달성 일수 */
  streak: number;
  /** 배지 크기 */
  size?: "default" | "sm" | "lg";
  /** 라벨 표시 여부 */
  showLabel?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * StreakBadge - 연속 달성 배지 컴포넌트
 * 사용자의 연속 달성 일수를 시각적으로 표시
 */
export function StreakBadge({
  streak,
  size = "default",
  showLabel = true,
  className,
}: StreakBadgeProps) {
  // 스트릭이 0이면 표시하지 않음
  if (streak <= 0) {
    return null;
  }

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    default: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    default: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <Badge
      variant="secondary"
      className={cn(
        "gap-1.5 font-semibold",
        streak > 0 &&
          "border-brand-primary/20 bg-brand-primary/10 text-brand-primary",
        sizeClasses[size],
        className
      )}
    >
      <Flame
        className={cn(
          iconSizes[size],
          streak > 0 && "fill-brand-primary text-brand-primary"
        )}
      />
      <span>{streak}일</span>
      {showLabel && size !== "sm" && <span className="text-xs">연속</span>}
    </Badge>
  );
}
