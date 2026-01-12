import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface LoadingStateProps {
  /**
   * 로딩 메시지 (선택 사항)
   */
  message?: string;

  /**
   * 전체 화면 로딩 여부
   * true: min-h-screen 적용
   * false: 컨테이너 크기만큼만 표시
   */
  fullScreen?: boolean;

  /**
   * 추가 CSS 클래스명
   */
  className?: string;
}

/**
 * 공통 로딩 상태 컴포넌트
 * - 회전하는 로딩 스피너
 * - 옵션 메시지 표시
 */
export function LoadingState({
  message = "로딩 중...",
  fullScreen = true,
  className,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        fullScreen && "min-h-screen",
        className
      )}
    >
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}
