"use client";

import Link from "next/link";

import { ArrowLeft, MoreVertical, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MissionHeaderProps {
  /** 미션 제목 */
  missionTitle: string;
  /** 뒤로가기 URL */
  backUrl: string;
  /** 수정 버튼 클릭 핸들러 */
  onEdit?: () => void;
  /** 삭제 버튼 클릭 핸들러 */
  onDelete?: () => void;
}

/**
 * MissionHeader - 미션 상세 페이지 헤더 컴포넌트
 * 뒤로가기 버튼, 미션 제목, 수정/삭제 메뉴 포함
 */
export function MissionHeader({
  missionTitle,
  backUrl,
  onEdit,
  onDelete,
}: MissionHeaderProps) {
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

        {/* 미션 제목 */}
        <h1 className="line-clamp-1 flex-1 px-4 text-center text-lg font-semibold">
          {missionTitle}
        </h1>

        {/* 수정/삭제 메뉴 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="shrink-0">
              <MoreVertical className="h-5 w-5" />
              <span className="sr-only">미션 메뉴</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {onEdit && (
              <DropdownMenuItem onClick={onEdit}>
                <Pencil className="mr-2 h-4 w-4" />
                미션 수정
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem onClick={onDelete} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                미션 삭제
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
