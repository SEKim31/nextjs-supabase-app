"use client";

import { useRouter } from "next/navigation";

import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  /**
   * 헤더에 표시할 제목
   */
  title: string;

  /**
   * 뒤로 가기 버튼 클릭 시 실행할 커스텀 핸들러
   * 제공되지 않으면 router.back() 실행
   */
  onBack?: () => void;

  /**
   * 헤더 오른쪽에 표시할 액션 버튼들
   */
  rightActions?: React.ReactNode;

  /**
   * 추가 CSS 클래스명
   */
  className?: string;
}

/**
 * 공통 페이지 헤더 컴포넌트
 * - Sticky 헤더로 스크롤 시에도 상단 고정
 * - 뒤로 가기 버튼 (왼쪽)
 * - 제목 (중앙 정렬)
 * - 옵션 액션 버튼들 (오른쪽)
 */
export function PageHeader({
  title,
  onBack,
  rightActions,
  className,
}: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header
      className={cn(
        "bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-10 border-b backdrop-blur-sm",
        className
      )}
    >
      <div className="flex h-14 items-center gap-4 px-4">
        {/* 뒤로 가기 버튼 */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          aria-label="뒤로가기"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {/* 제목 (중앙 정렬) */}
        <h1 className="flex-1 text-center text-lg font-semibold">{title}</h1>

        {/* 오른쪽 액션 버튼 또는 빈 공간 (중앙 정렬 유지용) */}
        {rightActions ? (
          <div className="flex items-center gap-2">{rightActions}</div>
        ) : (
          <div className="w-10" />
        )}
      </div>
    </header>
  );
}
