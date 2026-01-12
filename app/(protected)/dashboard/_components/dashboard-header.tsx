"use client";

import { Calendar } from "lucide-react";

interface DashboardHeaderProps {
  /** 사용자 닉네임 */
  userName?: string;
  /** 날짜 문자열 (제공되지 않으면 오늘 날짜 사용) */
  dateString?: string;
}

/**
 * 대시보드 상단 헤더 컴포넌트
 * 환영 메시지와 현재 날짜를 표시합니다.
 */
export function DashboardHeader({
  userName,
  dateString,
}: DashboardHeaderProps) {
  // 날짜 생성
  const today = new Date();
  const displayDate =
    dateString ||
    today.toLocaleDateString("ko-KR", {
      month: "long",
      day: "numeric",
      weekday: "long",
    });

  // 시간대별 인사말
  const hour = today.getHours();
  let greeting = "안녕하세요";
  if (hour < 12) {
    greeting = "좋은 아침이에요";
  } else if (hour < 18) {
    greeting = "좋은 오후에요";
  } else {
    greeting = "좋은 저녁이에요";
  }

  return (
    <div className="space-y-1 px-4 py-6">
      <h1 className="text-2xl font-bold">
        {userName ? `${userName}님, ${greeting}! 👋` : `${greeting}! 👋`}
      </h1>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>{displayDate}</span>
      </div>
    </div>
  );
}
