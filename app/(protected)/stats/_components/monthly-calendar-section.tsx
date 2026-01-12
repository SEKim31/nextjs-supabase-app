"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MonthlyCalendarSectionProps {
  verificationDates: Date[];
}

/**
 * 월간 캘린더 섹션 컴포넌트
 * 인증일을 하이라이트하여 표시합니다.
 *
 * @param verificationDates - 인증된 날짜 배열
 */
export function MonthlyCalendarSection({
  verificationDates,
}: MonthlyCalendarSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>월간 인증 현황</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Calendar
          mode="multiple"
          selected={verificationDates}
          disabled={{ after: new Date() }} // 미래 날짜 선택 불가
          className="rounded-md border"
        />
      </CardContent>
    </Card>
  );
}
