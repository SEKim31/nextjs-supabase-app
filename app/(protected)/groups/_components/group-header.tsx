"use client";

import Link from "next/link";

import { ArrowLeft, MoreVertical, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface GroupHeaderProps {
  /** 그룹 이름 */
  groupName: string;
  /** 뒤로가기 URL (기본: /groups) */
  backUrl?: string;
}

/**
 * GroupHeader - 그룹 상세 페이지 헤더 컴포넌트
 * 뒤로가기 버튼, 그룹명, 설정 메뉴 포함
 */
export function GroupHeader({
  groupName,
  backUrl = "/groups",
}: GroupHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between border-b px-4 py-3">
        {/* 뒤로가기 버튼 */}
        <Button variant="ghost" size="icon" asChild className="shrink-0">
          <Link href={backUrl}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">뒤로가기</span>
          </Link>
        </Button>

        {/* 그룹 이름 */}
        <h1 className="line-clamp-1 flex-1 px-4 text-center text-lg font-semibold">
          {groupName}
        </h1>

        {/* 설정 메뉴 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="shrink-0">
              <MoreVertical className="h-5 w-5" />
              <span className="sr-only">설정 메뉴</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* eslint-disable-next-line no-console */}
            <DropdownMenuItem onClick={() => console.log("그룹 설정")}>
              <Settings className="mr-2 h-4 w-4" />
              그룹 설정
            </DropdownMenuItem>
            {/* eslint-disable-next-line no-console */}
            <DropdownMenuItem onClick={() => console.log("알림 설정")}>
              알림 설정
            </DropdownMenuItem>
            {/* eslint-disable-next-line no-console */}
            <DropdownMenuItem
              onClick={() => console.log("나가기")}
              className="text-destructive"
            >
              그룹 나가기
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
