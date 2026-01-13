"use client";

import { cn } from "@/lib/utils";

interface StatChartData {
  /** 날짜 (YYYY-MM-DD) 또는 요일 라벨 */
  label: string;
  /** 값 (0-100) */
  value: number;
}

interface StatChartProps {
  /** 차트 데이터 배열 (최대 7개 권장) */
  data: StatChartData[];
  /** 차트 높이 (px) */
  height?: number;
  /** 라벨 표시 여부 */
  showLabels?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * StatChart - 주간 달성률 차트 컴포넌트
 * CSS 기반 막대 그래프로 주간 통계를 시각화
 */
export function StatChart({
  data,
  height = 200,
  showLabels = true,
  className,
}: StatChartProps) {
  // 최대값 계산 (스케일링을 위해)
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className={cn("w-full", className)}>
      {/* 차트 영역 */}
      <div
        className="relative flex w-full items-end justify-around gap-2 px-2"
        style={{ height: `${height}px` }}
      >
        {data.map((item, index) => {
          // 높이 계산 (0-100 범위를 차트 높이에 맞게 변환)
          const barHeight = (item.value / maxValue) * height;
          const percentage = Math.round(item.value);

          return (
            <div
              key={index}
              className="flex flex-1 flex-col items-center justify-end gap-1"
            >
              {/* 값 표시 (막대 위) */}
              {percentage > 0 && (
                <span className="text-muted-foreground text-xs font-semibold">
                  {percentage}%
                </span>
              )}

              {/* 막대 */}
              <div
                className={cn(
                  "w-full rounded-t-md transition-all duration-300 ease-out",
                  percentage === 100
                    ? "bg-brand-primary"
                    : percentage >= 70
                      ? "bg-brand-secondary"
                      : percentage > 0
                        ? "bg-muted-foreground/40"
                        : "bg-muted"
                )}
                style={{
                  height: `${Math.max(barHeight, 4)}px`, // 최소 높이 4px
                  minHeight: percentage > 0 ? "8px" : "4px",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* 라벨 영역 */}
      {showLabels && (
        <div className="mt-2 flex items-center justify-around gap-2 px-2">
          {data.map((item, index) => (
            <div key={index} className="flex-1 text-center">
              <span className="text-muted-foreground text-xs">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* 범례 */}
      <div className="text-muted-foreground mt-4 flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="bg-brand-primary h-3 w-3 rounded-sm" />
          <span>100%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="bg-brand-secondary h-3 w-3 rounded-sm" />
          <span>70% 이상</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="bg-muted-foreground/40 h-3 w-3 rounded-sm" />
          <span>70% 미만</span>
        </div>
      </div>
    </div>
  );
}
