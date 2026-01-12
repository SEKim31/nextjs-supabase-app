"use client";

import { VerificationFeed } from "@/components/common/verification-feed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type {
  VerificationWithCheers,
  VerificationWithUser,
} from "@/lib/types/database";

interface VerificationFeedSectionProps {
  /** 인증 피드 목록 */
  verifications: (VerificationWithUser & VerificationWithCheers)[];
  /** 현재 로그인한 사용자 ID */
  currentUserId: string;
  /** 응원하기 핸들러 */
  onCheer: (verificationId: string) => void;
}

/**
 * VerificationFeedSection - 인증 피드 섹션 컴포넌트
 * 미션의 모든 인증 기록을 피드 형태로 표시
 */
export function VerificationFeedSection({
  verifications,
  currentUserId,
  onCheer,
}: VerificationFeedSectionProps) {
  // 인증 기록이 없는 경우
  if (verifications.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">인증 피드</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-sm text-muted-foreground">
              아직 인증 기록이 없습니다.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              첫 번째 인증을 시작해보세요!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold">
        인증 피드 ({verifications.length})
      </h2>

      {/* 인증 피드 목록 */}
      <div className="space-y-3">
        {verifications.map((verification) => (
          <VerificationFeed
            key={verification.id}
            verification={verification}
            currentUserId={currentUserId}
            onCheer={() => onCheer(verification.id)}
          />
        ))}
      </div>
    </div>
  );
}
