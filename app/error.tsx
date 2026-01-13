"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

/**
 * 전역 에러 바운더리
 * 애플리케이션에서 발생하는 예상치 못한 에러를 처리
 * 'use client' 지시문이 필수
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러 로깅 (프로덕션에서는 Sentry 등의 서비스로 전송 가능)
    console.error("에러 발생:", error);
  }, [error]);

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* 에러 아이콘 */}
        <div className="bg-destructive/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
          <svg
            className="text-destructive h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* 에러 메시지 */}
        <div className="space-y-2">
          <h2 className="text-foreground text-2xl font-bold">
            문제가 발생했습니다
          </h2>
          <p className="text-muted-foreground text-sm">
            예상치 못한 오류가 발생했습니다.
            <br />
            잠시 후 다시 시도해주세요.
          </p>
        </div>

        {/* 에러 상세 정보 (개발 환경에서만 표시) */}
        {process.env.NODE_ENV === "development" && (
          <div className="bg-muted rounded-lg p-4 text-left">
            <p className="text-muted-foreground font-mono text-xs break-all">
              {error.message}
            </p>
          </div>
        )}

        {/* 재시도 버튼 */}
        <div className="flex flex-col gap-2">
          <Button onClick={reset} size="lg" className="w-full">
            다시 시도
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => (window.location.href = "/")}
          >
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
}
