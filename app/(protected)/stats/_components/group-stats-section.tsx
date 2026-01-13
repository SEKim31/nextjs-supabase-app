import { CheckCircle, Heart } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * 그룹별 통계 Props
 */
interface GroupStatsSectionProps {
  groupStats: Array<{
    groupId: string;
    groupName: string;
    totalVerifications: number;
    totalCheers: number;
  }>;
}

/**
 * 그룹별 누적 통계 섹션 컴포넌트
 * 각 그룹의 총 인증 수와 응원 수를 카드로 표시
 */
export function GroupStatsSection({ groupStats }: GroupStatsSectionProps) {
  // 그룹이 없는 경우 처리
  if (groupStats.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>그룹별 통계</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground py-8 text-center">
            아직 그룹이 없습니다
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>그룹별 통계</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {groupStats.map((group) => (
            <Card key={group.groupId} className="shadow-xs">
              <CardContent className="pt-6">
                {/* 그룹 이름 */}
                <h3 className="mb-3 text-base font-semibold">
                  {group.groupName}
                </h3>

                {/* 통계 정보 */}
                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                  {/* 총 인증 수 */}
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="text-primary h-4 w-4" />
                    <span>
                      총 인증 수: <strong>{group.totalVerifications}</strong>회
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
  );
}
