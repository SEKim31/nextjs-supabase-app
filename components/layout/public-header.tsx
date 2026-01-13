import Link from "next/link";

import { cn } from "@/lib/utils";

interface PublicHeaderProps {
  className?: string;
}

// 공개 페이지(로그인 전)용 헤더 컴포넌트
export function PublicHeader({ className }: PublicHeaderProps) {
  return (
    <header
      className={cn(
        "bg-background sticky top-0 z-50 flex h-14 w-full items-center justify-center border-b px-4",
        className
      )}
    >
      {/* 로고 (중앙 정렬) */}
      <Link href="/" className="flex items-center gap-2">
        <span className="text-primary text-xl font-bold">하루모아</span>
      </Link>
    </header>
  );
}
