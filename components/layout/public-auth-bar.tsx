import Link from "next/link";

import { Button } from "@/components/ui/button";
import { TAB_BAR_HEIGHT } from "@/lib/constants/layout";
import { cn } from "@/lib/utils";

interface PublicAuthBarProps {
  className?: string;
}

// 공개 페이지(로그인 전)용 하단 인증 버튼 바
export function PublicAuthBar({ className }: PublicAuthBarProps) {
  return (
    <nav
      className={cn(
        "bg-background fixed right-0 bottom-0 left-0 z-50 border-t",
        // Safe Area 대응: 하단 여백 추가 (iOS 홈바 등)
        "pb-safe",
        className
      )}
      style={{ height: TAB_BAR_HEIGHT }}
      aria-label="로그인 메뉴"
    >
      <div className="mx-auto flex h-full max-w-lg items-center justify-center gap-3 px-4">
        {/* 로그인 버튼 */}
        <Button variant="outline" className="flex-1" asChild>
          <Link href="/auth/login">로그인</Link>
        </Button>

        {/* 회원가입 버튼 */}
        <Button
          className="bg-brand-primary hover:bg-brand-primary/90 flex-1"
          asChild
        >
          <Link href="/auth/sign-up">시작하기</Link>
        </Button>
      </div>
    </nav>
  );
}
