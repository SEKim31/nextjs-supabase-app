"use client";

import Link from "next/link";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuickVerifyFabProps {
  /** 버튼 클릭 핸들러 (Link 대신 커스텀 동작이 필요한 경우) */
  onClick?: () => void;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 빠른 인증을 위한 Floating Action Button (FAB) 컴포넌트
 * 화면 우측 하단에 고정되어 빠른 미션 인증을 유도합니다.
 */
export function QuickVerifyFab({ onClick, className }: QuickVerifyFabProps) {
  const baseClassName = cn(
    // 고정 위치: 우측 하단
    "fixed right-4 bottom-20 z-50",
    // Safe Area 대응 (iOS 홈바 등)
    "mb-safe",
    // 크기 및 스타일
    "h-14 w-14 rounded-full shadow-lg",
    // 애니메이션
    "transition-transform hover:scale-110 active:scale-95",
    className
  );

  if (onClick) {
    return (
      <Button
        size="icon"
        onClick={onClick}
        className={baseClassName}
        aria-label="빠른 인증"
      >
        <Plus className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Button
      size="icon"
      asChild
      className={baseClassName}
      aria-label="빠른 인증"
    >
      <Link href="/missions/verify">
        <Plus className="h-6 w-6" />
      </Link>
    </Button>
  );
}
