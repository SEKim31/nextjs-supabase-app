"use client";

import { useMemo } from "react";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MonthlyCalendarSectionProps {
  /** 인증 완료 날짜 목록 (ISO 8601 형식) */
  verificationDates: string[];
  /** 현재 선택된 월 (기본: 현재 월) */
  currentMonth?: Date;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * MonthlyCalendarSection - 월별 캘린더 섹션 컴포넌트
 * 인증 완료 날짜를 하이라이트하여 표시
 */
export function MonthlyCalendarSection({
  verificationDates,
  currentMonth = new Date(),
  className,
}: MonthlyCalendarSectionProps) {
  // 인증 날짜를 Date 객체 배열로 변환
  const verifiedDates = useMemo(() => {
    return verificationDates.map((dateStr) => {
      // ISO 8601 날짜를 로컬 날짜로 변환
      const date = new Date(dateStr);
      // 시간을 00:00:00으로 설정하여 날짜만 비교
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    });
  }, [verificationDates]);

  // 날짜 비교 헬퍼 함수
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // 인증된 날짜인지 확인
  const isVerifiedDate = (date: Date) => {
    return verifiedDates.some((verifiedDate) => isSameDay(date, verifiedDate));
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="text-base">이번 달 인증 현황</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          month={currentMonth}
          modifiers={{
            verified: verifiedDates,
          }}
          modifiersClassNames={{
            verified: "bg-brand-primary/20 text-brand-primary font-bold",
          }}
          classNames={{
            day: cn(
              "relative",
              // 인증된 날짜 스타일
              "[&[data-verified='true']]:bg-brand-primary/20 [&[data-verified='true']]:font-bold [&[data-verified='true']]:text-brand-primary"
            ),
          }}
          components={{
            DayButton: ({ day, ...props }) => {
              const isVerified = isVerifiedDate(day.date);

              return (
                <button
                  {...props}
                  data-verified={isVerified}
                  className={cn(
                    props.className,
                    isVerified &&
                      "bg-brand-primary/20 font-bold text-brand-primary hover:bg-brand-primary/30"
                  )}
                >
                  {day.date.getDate()}
                </button>
              );
            },
          }}
          className="w-full"
        />

        {/* 인증 통계 */}
        <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-brand-primary/20" />
            <span>인증 완료: {verificationDates.length}일</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
