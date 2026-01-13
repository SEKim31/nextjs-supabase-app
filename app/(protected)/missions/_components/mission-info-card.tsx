"use client";

import { Camera, CheckSquare, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DAY_LABELS,
  REPEAT_LABELS,
  RepeatType,
  VERIFICATION_LABELS,
  VerificationType,
} from "@/lib/types/enums";

interface MissionInfoCardProps {
  /** 미션 설명 */
  description: string | null;
  /** 반복 유형 */
  repeatType: RepeatType;
  /** 반복 요일 (specific_days인 경우) */
  repeatDays: number[] | null;
  /** 인증 타입 */
  verificationType: VerificationType;
}

/**
 * MissionInfoCard - 미션 정보 표시 카드 컴포넌트
 * 미션 설명, 반복 유형, 인증 타입 등을 표시
 */
export function MissionInfoCard({
  description,
  repeatType,
  repeatDays,
  verificationType,
}: MissionInfoCardProps) {
  // 인증 타입 아이콘 매핑
  const getVerificationIcon = () => {
    switch (verificationType) {
      case "photo":
        return Camera;
      case "text":
        return FileText;
      case "checklist":
        return CheckSquare;
      default:
        return Camera;
    }
  };

  const VerificationIcon = getVerificationIcon();

  // 반복 요일 텍스트 생성
  const getRepeatDaysText = () => {
    if (repeatType === "daily") {
      return "매일";
    }

    if (!repeatDays || repeatDays.length === 0) {
      return "설정 없음";
    }

    // 요일을 정렬하여 표시
    const sortedDays = [...repeatDays].sort((a, b) => a - b);
    return sortedDays
      .map((day) => DAY_LABELS[day as keyof typeof DAY_LABELS])
      .join(", ");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">미션 정보</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 미션 설명 */}
        {description && (
          <div>
            <h3 className="text-muted-foreground mb-2 text-sm font-medium">
              설명
            </h3>
            <p className="text-sm leading-relaxed">{description}</p>
          </div>
        )}

        {/* 반복 유형 */}
        <div>
          <h3 className="text-muted-foreground mb-2 text-sm font-medium">
            반복
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">
              {REPEAT_LABELS[repeatType]} - {getRepeatDaysText()}
            </Badge>
          </div>
        </div>

        {/* 인증 타입 */}
        <div>
          <h3 className="text-muted-foreground mb-2 text-sm font-medium">
            인증 방법
          </h3>
          <div className="flex items-center gap-2">
            <VerificationIcon className="text-muted-foreground h-4 w-4" />
            <span className="text-sm">
              {VERIFICATION_LABELS[verificationType]}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
