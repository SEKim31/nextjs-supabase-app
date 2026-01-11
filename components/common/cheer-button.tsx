"use client";

import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CheerButtonProps {
  /** 현재 응원 개수 */
  count: number;
  /** 현재 사용자가 응원했는지 여부 */
  isActive: boolean;
  /** 응원 버튼 클릭 핸들러 */
  onCheer: () => void;
  /** 버튼 크기 */
  size?: "default" | "sm" | "lg" | "icon";
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * CheerButton - 응원 버튼 컴포넌트
 * 인증 피드에서 다른 사용자를 응원할 때 사용
 */
export function CheerButton({
  count,
  isActive,
  onCheer,
  size = "default",
  className,
}: CheerButtonProps) {
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      size={size}
      onClick={onCheer}
      className={cn(
        "gap-2 transition-all",
        isActive &&
          "border-brand-primary bg-brand-primary text-white hover:bg-brand-primary/90",
        className
      )}
    >
      <Sparkles
        className={cn(
          "h-4 w-4",
          isActive && "fill-current",
          size === "sm" && "h-3 w-3",
          size === "lg" && "h-5 w-5"
        )}
      />
      <span className="font-medium">최고야!</span>
      {count > 0 && (
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-xs font-semibold",
            isActive ? "bg-white/20" : "bg-muted"
          )}
        >
          {count}
        </span>
      )}
    </Button>
  );
}
