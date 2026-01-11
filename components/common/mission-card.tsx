"use client";

import { Camera, CheckSquare, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Mission } from "@/lib/types/database";
import type { VerificationType } from "@/lib/types/enums";
import { VERIFICATION_LABELS } from "@/lib/types/enums";
import { cn } from "@/lib/utils";

interface MissionCardProps {
  /** 미션 데이터 */
  mission: Mission;
  /** 오늘 인증 완료 여부 */
  isCompletedToday: boolean;
  /** 인증하기 버튼 클릭 핸들러 */
  onVerify: () => void;
  /** 추가 CSS 클래스 */
  className?: string;
}

// 인증 타입별 아이콘 매핑
const VERIFICATION_ICON_MAP: Record<VerificationType, React.ElementType> = {
  photo: Camera,
  text: FileText,
  checklist: CheckSquare,
};

/**
 * MissionCard - 미션 카드 컴포넌트
 * 그룹의 미션 목록에서 각 미션을 표시
 */
export function MissionCard({
  mission,
  isCompletedToday,
  onVerify,
  className,
}: MissionCardProps) {
  const Icon = VERIFICATION_ICON_MAP[mission.verification_type];

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="flex-1 text-base font-semibold">
            {mission.title}
          </CardTitle>
          <Badge
            variant="outline"
            className={cn(
              "shrink-0 gap-1",
              isCompletedToday &&
                "border-brand-primary/20 bg-brand-primary/10 text-brand-primary"
            )}
          >
            <Icon className="h-3 w-3" />
            <span className="text-xs">
              {VERIFICATION_LABELS[mission.verification_type]}
            </span>
          </Badge>
        </div>
        {mission.description && (
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {mission.description}
          </p>
        )}
      </CardHeader>
      <CardContent>
        {isCompletedToday ? (
          <div className="flex items-center justify-center py-2">
            <Badge className="bg-brand-primary text-white hover:bg-brand-primary/90">
              ✓ 오늘 인증 완료
            </Badge>
          </div>
        ) : (
          <Button
            onClick={onVerify}
            className="w-full bg-brand-primary text-white hover:bg-brand-primary/90"
          >
            <Icon className="mr-2 h-4 w-4" />
            인증하기
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
