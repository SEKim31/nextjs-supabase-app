import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  /**
   * 에러 객체 또는 에러 메시지
   */
  error?: Error | string | null;

  /**
   * 에러 제목
   */
  title?: string;

  /**
   * 재시도 버튼 클릭 핸들러
   */
  onRetry?: () => void;

  /**
   * 전체 화면 에러 여부
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
 * 공통 에러 상태 컴포넌트
 * - 에러 메시지 표시
 * - 재시도 버튼 (옵션)
 */
export function ErrorState({
  error,
  title = "오류가 발생했습니다",
  onRetry,
  fullScreen = true,
  className,
}: ErrorStateProps) {
  const errorMessage =
    typeof error === "string"
      ? error
      : error?.message || "알 수 없는 오류가 발생했습니다.";

  return (
    <div
      className={cn(
        "flex items-center justify-center p-4",
        fullScreen && "min-h-screen",
        className
      )}
    >
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription className="mt-2">{errorMessage}</AlertDescription>

        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            size="sm"
            className="mt-4"
          >
            다시 시도
          </Button>
        )}
      </Alert>
    </div>
  );
}
