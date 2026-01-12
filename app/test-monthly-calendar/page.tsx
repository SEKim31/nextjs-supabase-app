import { MOCK_VERIFICATIONS } from "@/lib/mocks/verifications";

import { MonthlyCalendarSection } from "../(protected)/stats/_components";

// 월간 캘린더 테스트 페이지 (인증 불필요)
export default function TestMonthlyCalendarPage() {
  // Mock 데이터에서 인증 날짜 추출
  const verificationDates = MOCK_VERIFICATIONS.map(
    (v) => new Date(v.verified_at)
  );

  return (
    <div className="container mx-auto space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold">월간 캘린더 컴포넌트 테스트</h1>
        <p className="mt-2 text-muted-foreground">
          인증된 날짜가 하이라이트로 표시됩니다.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          총 {verificationDates.length}개의 인증 날짜
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <MonthlyCalendarSection verificationDates={verificationDates} />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">인증 날짜 목록</h2>
          <div className="max-h-[500px] overflow-y-auto rounded-lg border p-4">
            <ul className="space-y-2">
              {verificationDates
                .sort((a, b) => b.getTime() - a.getTime())
                .map((date, index) => (
                  <li key={index} className="text-sm">
                    {date.toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      weekday: "short",
                    })}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
