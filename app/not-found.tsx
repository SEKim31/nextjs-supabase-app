"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

/**
 * 404 Not Found 페이지
 * 존재하지 않는 경로에 접근했을 때 표시
 */
export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* 404 텍스트 */}
        <div className="space-y-2">
          <h1 className="text-8xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-bold text-foreground">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-sm text-muted-foreground">
            요청하신 페이지가 존재하지 않거나,
            <br />
            이동되었을 수 있습니다.
          </p>
        </div>

        {/* 일러스트레이션 (선택적) */}
        <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-muted">
          <svg
            className="h-16 w-16 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
        </div>

        {/* 홈으로 돌아가기 버튼 */}
        <div className="flex flex-col gap-2">
          <Button asChild size="lg" className="w-full">
            <Link href="/">홈으로 돌아가기</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => router.back()}
          >
            이전 페이지로
          </Button>
        </div>
      </div>
    </div>
  );
}
