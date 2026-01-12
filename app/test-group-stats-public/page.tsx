import { CheckCircle, Heart } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_WEEKLY_STATS } from "@/lib/mocks";

/**
 * GroupStatsSection 컴포넌트 Public 테스트 페이지
 * (인증 없이 접근 가능)
 */
export default function TestGroupStatsPublicPage() {
  // MOCK_WEEKLY_STATS를 배열로 변환
  const groupStats = Object.values(MOCK_WEEKLY_STATS).map((stat) => ({
    groupId: stat.groupId,
    groupName: stat.groupName,
    totalVerifications: stat.totalVerifications,
    totalCheers: stat.totalCheers,
  }));

  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-6">
      <div>
        <h1 className="mb-2 text-2xl font-bold">
          GroupStatsSection 컴포넌트 테스트
        </h1>
        <p className="text-muted-foreground">
          그룹별 누적 통계를 확인할 수 있습니다.
        </p>
      </div>

      {/* 그룹별 통계 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle>그룹별 통계</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            {groupStats.map((group) => (
              <Card key={group.groupId} className="shadow-sm">
                <CardContent className="pt-6">
                  {/* 그룹 이름 */}
                  <h3 className="mb-3 text-base font-semibold">
                    {group.groupName}
                  </h3>

                  {/* 통계 정보 */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {/* 총 인증 수 */}
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>
                        총 인증 수: <strong>{group.totalVerifications}</strong>
                        회
                      </span>
                    </div>

                    {/* 총 응원 수 */}
                    <div className="flex items-center gap-1.5">
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                      <span>
                        총 응원 수: <strong>{group.totalCheers}</strong>회
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 빈 데이터 테스트 */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-bold">빈 데이터 테스트</h2>
        <Card>
          <CardHeader>
            <CardTitle>그룹별 통계</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="py-8 text-center text-muted-foreground">
              아직 그룹이 없습니다
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
